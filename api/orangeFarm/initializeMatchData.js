var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017/JuicyData"

var apiKey = require('./../../config/apiKey.js')
var axios = require('axios')
var toaApi = axios.create({
	baseURL: 'http://theorangealliance.org/apiv2/',
	timeout: 10000,
	headers: {'X-Application-Origin': 'JuicyData', 'X-TOA-Key': apiKey}
})

var forceUpdate = false //DANGER! Set to true to overwrite existing match data.

var completedEvents = []

module.exports = getData

function getData(eventKeys, callback) {
	completedEvents = []
	MongoClient.connect(url, function(err, db) {
		if (err) throw err

		let finishIfDone = function() {
			if (completedEvents.length === eventKeys.length) {
				db.close()
				console.log('Done initializing matchData!')
				callback()
			}
		}

		for (let eventKey of eventKeys) {
			db.collection('matchData').findOne({'_id.toaEventKey': eventKey}, function(err, data) {
				if (err) throw err
				if (data && !forceUpdate) {
					console.log('Match data for ' + eventKey + ' event already exists in the database. Skipping.')
					completedEvents.push(eventKey)
					finishIfDone()
				} else {
					db.collection('schedules').findOne({'_id': eventKey}, function(err, data) {
						if (!data) {
							console.log('No schedule for ' + eventKey + ' event!!!!')
							completedEvents.push(eventKey)
							finishIfDone()
						} else {
							for (let match of data.schedule) {
								let matchData = {
									_id:{
										toaEventKey: eventKey,
										matchInformation:{
											matchNumber: match.matchNumber,
											teams: {
												red1: match.teams.red1.teamNumber,
												red2: match.teams.red2.teamNumber,
												blue1: match.teams.blue1.teamNumber,
												blue2: match.teams.blue2.teamNumber
											}
										}
									},
									resultInformation:{
										winner: '',
										score:{
											auto:{
												red: '',
												blue: ''
											},
											driver:{
												red: '',
												blue: ''
											},
											end:{
												red: '',
												blue: ''
											},
											total:{
												red: '',
												blue: ''
											},
											penalty:{
												red: '',
												blue: ''
											},
											final:{
												red: '',
												blue:''
											}
										}
									}
								}
								db.collection('matchData').save(matchData, function(err, res) {
							    	if (err) throw err
							    	completedEvents.push(eventKey)
							    	finishIfDone()
							  	})
							}
						}
					})
				}
			})
		}
	})
}
