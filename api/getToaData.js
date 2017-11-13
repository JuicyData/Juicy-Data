var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017/TheOrangeAlliance"

var apiKey = require('../config/apiKey.js')
var axios = require('axios')
var toaApi = axios.create({
	baseURL: 'http://theorangealliance.org/apiv2/',
	timeout: 10000,
	headers: {'X-Application-Origin': 'JuicyData', 'X-TOA-Key': apiKey}
})
var eventKeys = ['1718-NCAL-RWC']

module.exports = function() {
	getData()
}

function getData() {
	MongoClient.connect(url, function(err, db) {
	if (err) throw err;
		for (let eventKey of eventKeys) {
			toaApi.get('/event/' + eventKey).then(function(response) {
				let event = response.data[0];
				let eventInformation = {
					name: event.event_name,
					date: event.start_date, //Should be ISODate Type thingy....? (need to check latter)
					locationID: 'Lol..' //ObjectId Type; need to querry database for this location ID....
				}
				// let eventInformation:{
				// 	date: ISODate(), //ISO Date of when it occured; 
				// 	locationID: ObjectId() //ID of the location in the 'places' collection
				// }
				toaApi.get('/event/' + eventKey + '/matches').then(function(response) {
					let matches = response.data;
					let relevantMatches = []
					let matchNumbers = []
					let currentMatchKey
					let matchDatas = {}
					let gameDatas = {red: {}, blue: {}}
					for (let match of matches) {
						let matchNumber
						if (matchNumber = match.match_name.split('Quals ')[1]) {
							matchNumbers.push(matchNumber)
							relevantMatches.push(match)
						}
					}
					for (let i = 0; i < relevantMatches.length; i++) {
						let match = relevantMatches[i]
						let matchNumber = matchNumbers[i]
						currentMatchKey = match.match_key
						toaApi.get('/match/' + match.match_key + '/stations').then(function(response) {
							let stations = response.data
							let teams = {
								red: [],
								blue: []
							}
							for (let station of stations) {
								allianceCode = station.station_key.charAt(station.station_key.length-2)
								if (allianceCode === 'R') {
									teams.red.push(Number(station.team_key))
								} else if (allianceCode === 'B') {
									teams.blue.push(Number(station.team_key))
								}
							}

							let matchData = {
								_id:{
									eventInformation: eventInformation,
									matchInformation:{
										matchNumber: Number(matchNumber),
										teams:{	//NOT SURE IF WE ACUALLY NEED THIS; WE HAVE SCHEDULE WHICH SHOULD BE A MATCH OF THIS
											red1: teams.red[0],
											red2: teams.red[1],
											blue1: teams.blue[0],
											blue2: teams.blue[1]
										}
									}
								},
								resultInformation:{
									winner: match.red_score > match.blue_score ? 'red' : match.blue_score > match.red_score ? 'blue' : 'tie', //Pls check latter if "score" indlues penailtyes for this caluclation
									score:{
										auto:{
											red: match.red_auto_score,
											blue: match.blue_auto_score
										},
										driver:{
											red: match.red_tele_score,
											blue: match.blue_tele_score
										},
										end:{
											red: match.red_end_score,
											blue: match.blue_end_score
										},
										total:{
											// red: match.red_score - match.blue_penalty, //I think that blue penialty is the penailty blue gets
											// blue: match.blue_score - match.red_penalty //And score is their total (penailty + score)
											red: match.red_auto_score + match.red_tele_score + match.red_end_score,
											blue: match.blue_auto_score + match.blue_tele_score + match.blue_end_score
										},
										penalty:{
											red: match.red_penalty,
											blue: match.blue_penalty
										},
										final:{
											red: match.red_score,
											blue: match.blue_score
										}
									}
								}
							}
							insert(db, 'matchData', matchData)
							matchDatas[matchNumber] = matchData

							toaApi.get('/match/' + match.match_key + '/details').then(function(response) {
								let matchDetails = response.data[0]
								for (let alliance of ['red', 'blue']) {
									let gameData = {
										_id:{
											eventInformation: eventInformation,
											matchInformation:{
												matchNumber: matchNumber,
												robotAlliance: alliance, //blue or red; with lower case
												teams: teams[alliance]
											}
										},
										gameInformation:{	//CHECK IF ALL THSES TYPES ARE CORRECT AND ALSO HAVE COFRRECT MEANING!
											auto:{
												jewel: matchDetails[alliance+'_auto_jewel'],
												glyphs: matchDetails[alliance+'_auto_glyphs'],
												keys: matchDetails[alliance+'_auto_keys'],
												park: matchDetails[alliance+'_auto_park']
											},
											driver:{
												glyphs: matchDetails[alliance+'_tele_glyphs'],
												rows: matchDetails[alliance+'_tele_rows'],
												columns: matchDetails[alliance+'_tele_columns'],
												cypher: matchDetails[alliance+'_tele_cypher']
											},
											end:{
												relic1: matchDetails[alliance+'_end_relic_one'],	//Amount of relics in that zone
												relic2: matchDetails[alliance+'_end_relic_two'],
												relic3: matchDetails[alliance+'_end_relic_three'],
												relicsUp: matchDetails[alliance+'_end_relic_up'],	//Amount of relects standing up
												balanced: matchDetails[alliance+'_end_robot_bal']	//How many robots are balanced
											}
										}
									}
									insert(db, 'gameData', gameData)
									gameDatas[alliance][matchNumber] = gameData
									if (currentMatchKey === relevantMatches[relevantMatches.length-1].match_key && gameDataIsComplete(matchNumbers, gameDatas)) {
										db.close()
										printDatas(matchNumbers, matchDatas, gameDatas)
									}
								}
							})
						})
					}
				})
			})
		}
	})
	// setTimeout(getData, 180000) Do it all again in 3 minutes
}

function insert(db, collectionName, data) {
  	db.collection(collectionName).insertOne(data, function(err, res) {
    	if (err) { //TODO: Make better way to check if data already exists. Doing this requires the least amount of code, however
    		if (err.code == 11000) { // Duplicate key error
    			console.log('Skipping data. Document with _id "' + JSON.stringify(data._id) + '" already exists.')
    		} else {
    			throw err
    		}
    	} 
  	});
}

function printDatas(matchNumbers, matchDatas, gameDatas) {
	for (let matchNumber of matchNumbers) {
		console.log('Match ' + matchNumber + ' matchData:')
		console.log(JSON.stringify(matchDatas[matchNumber], null, 2))
		console.log()
		console.log('Match ' + matchNumber + ' red gameData:')
		console.log(JSON.stringify(gameDatas.red[matchNumber], null, 2))
		console.log()
		console.log('Match ' + matchNumber + ' blue gameData:')
		console.log(JSON.stringify(gameDatas.blue[matchNumber], null, 2))
		console.log()
		console.log()
	}
}

function gameDataIsComplete(matchNumbers, gameDatas) {
	for (let matchNumber of matchNumbers) {
		if (!gameDatas.red[matchNumber] || !gameDatas.blue[matchNumber]) {
			return false
		}
	}
	return true
}