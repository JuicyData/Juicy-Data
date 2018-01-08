var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017/JuicyData"

var apiKey = require('../config/apiKey.js')
var axios = require('axios')
var toaApi = axios.create({
	baseURL: 'http://theorangealliance.org/apiv2/',
	timeout: 10000,
	headers: {'X-Application-Origin': 'JuicyData', 'X-TOA-Key': apiKey}
})
var eventKeys = [
	'1718-NCAL-RWC',

	'1718-FIM-CMP1',	//team 5386
	'1718-FIM-MARY',
	'1718-FIM-GLBR'
	] //Currently ongoing events

module.exports = function() {
	getData()
}

function getData() {
	MongoClient.connect(url, function(err, db) {
		if (err) throw err
		let matchDatas = {}
		let gameDatas = {red: {}, blue: {}}
		let matchNumbers = {}
		for (let eventKey of eventKeys) {
			db.collection('events').findOne({'_id': eventKey}, function(err, data) {
				if (err) throw err
				let eventInformation = null
				if (data) {
					eventInformation = data._id
				} else {
					console.log('No event in database for TOA event key ' + eventKey)
				}
				toaApi.get('/event/' + eventKey + '/matches').then(function(response) {
					let matches = response.data
					matchNumbers[eventKey] = []
					let relevantMatches = {}
					matchDatas[eventKey] = {}
					gameDatas.red[eventKey] = {}
					gameDatas.blue[eventKey] = {}
					for (let match of matches) {
						let matchNumber = match.match_name.split('Quals ')[1]
						if (matchNumber) {
							if (!matchNumbers[eventKey].includes(matchNumber)) {
								matchNumbers[eventKey].push(Number(matchNumber))
							}
							relevantMatches[matchNumber] = match
						}
					}
					for (let matchNumber of matchNumbers[eventKey]) {
						let match = relevantMatches[matchNumber]
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
									toaEventKey: eventKey,
									matchInformation:{
										matchNumber: Number(matchNumber),
										teams: {
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
							saveMatchData(db, matchData, eventKey, matchNumber, eventKeys, matchNumbers, matchDatas, gameDatas)

							toaApi.get('/match/' + match.match_key + '/details').then(function(response) {
								let matchDetails = response.data[0]
								for (let alliance of ['red', 'blue']) {
									let gameData = {
										_id:{
											toaEventKey: eventKey,
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
									saveGameData(db, gameData, alliance, eventKey, matchNumber, eventKeys, matchNumbers, matchDatas, gameDatas)
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

function saveMatchData(db, matchData, eventKey, matchNumber, eventKeys, matchNumbers, matchDatas, gameDatas) {
  	db.collection('matchData').save(matchData, function(err, res) {
    	if (err) throw err
    	matchDatas[eventKey][matchNumber] = matchData
    	finishIfDone(db, eventKeys, matchNumbers, matchDatas, gameDatas)
  	})
}

function saveGameData(db, gameData, alliance, eventKey, matchNumber, eventKeys, matchNumbers, matchDatas, gameDatas) {
  	db.collection('gameData').save(gameData, function(err, res) {
    	if (err) throw err
    	gameDatas[alliance][eventKey][matchNumber] = gameData
    	finishIfDone(db, eventKeys, matchNumbers, matchDatas, gameDatas)
  	})
}

function finishIfDone(db, eventKeys, matchNumbers, matchDatas, gameDatas) {
	for (let eventKey of eventKeys) {
		for (let matchNumber of matchNumbers[eventKey]) {
			if (!matchDatas[eventKey][matchNumber] || !gameDatas.red[eventKey][matchNumber] || !gameDatas.blue[eventKey][matchNumber]) {
				return
			}
		}
	}
	db.close()
	printDatas(eventKeys, matchNumbers, matchDatas, gameDatas)
}

function printDatas(eventKeys, matchNumbers, matchDatas, gameDatas) {
	for (let eventKey of eventKeys) {
		for (let matchNumber of matchNumbers[eventKey]) {
			console.log(eventKey + ' Match ' + matchNumber + ' matchData:')
			console.log(JSON.stringify(matchDatas[eventKey][matchNumber], null, 2))
			console.log()
			console.log(eventKey + ' Match ' + matchNumber + ' red gameData:')
			console.log(JSON.stringify(gameDatas.red[eventKey][matchNumber], null, 2))
			console.log()
			console.log(eventKey + ' Match ' + matchNumber + ' blue gameData:')
			console.log(JSON.stringify(gameDatas.blue[eventKey][matchNumber], null, 2))
			console.log()
			console.log()
		}
		console.log()
	}
}