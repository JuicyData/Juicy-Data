var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017/JuicyData"

var apiKey = require('../config/apiKey.js')
var axios = require('axios')
var toaApi = axios.create({
	baseURL: 'http://theorangealliance.org/apiv2/',
	timeout: 10000,
	headers: {'X-Application-Origin': 'JuicyData', 'X-TOA-Key': apiKey}
})

// Find these at theorangealliance.org
var eventKeys = [
	'1718-NCAL-RWC', //testing
	'1617-CASD-GAUS', //testing
	'1718-CASD-TUR', 
	'1718-CASD-GAUS',
	'1718-CASD-EUCL',

	'1718-FIM-CMP1',	//team 5386
	'1718-FIM-MARY',
	'1718-FIM-GLBR'
	]

var forceUpdate = true //Set to true to write to database even if data exists, 
						//and even if schedule is empty, but you still want the event.

var completedEvents = []

module.exports = function() {
	getData()
}

function getData() {
	completedEvents = []
	MongoClient.connect(url, function(err, db) {
		if (err) throw err
		for (let eventKey of eventKeys) {
			db.collection('events').findOne({'_id': eventKey}, function(err, data) {
				if (err) throw err
				if (data && !forceUpdate) {
					console.log(eventKey + ' event already exists in the database')
					completedEvents.push(eventKey)
					finishIfDone(db)
				} else {
					toaApi.get('/event/' + eventKey).then(function(response) {
						let event = response.data[0]
						toaApi.get('/event/' + eventKey + '/teams').then(function(response) {
							let teams = response.data
							toaApi.get('/event/' + eventKey + '/matches/stations').then(function(response) {
								let stations = response.data
								if (stations.length === 0 && !forceUpdate) {
									console.log('No stations available from TOA for ' + eventKey + ' event!')
									completedEvents.push(eventKey)
									finishIfDone(db)
								} else {
									console.log('Writing ' + eventKey + ' event!')
									if (!event.venue) {
										console.log('TOA event ' + eventKey + ' does not have enough location information!')
										insertEventAndSchedule(db, event, teams, stations, null)
									} else {
										db.collection('locations').findOne({
											'name': event.venue,
											'address.city': event.city,
											'address.state': event.state_prov,
											'address.country': event.country
										}, function(err, data) {
											if (err) throw err
											if (data) {
												console.log('Location ' + event.venue + ' already exists in the database')
												insertEventAndSchedule(db, event, teams, stations, data)
											} else {
												console.log('Writing location ' + event.venue + '!')
												let location = {
													name: event.venue,
													address: {
														city: event.city,
														state: event.state_prov,
														country: event.country
													}
												}
												db.collection('locations').save(location, function(err) {
													if (err) throw err
													insertEventAndSchedule(db, event, teams, stations, location)
												})
											}
										})
									}
								}
							})
						})
					})
				}
			})
		}
	})
}

function insertEventAndSchedule(db, event, teams, stations, location) {
	// let eventInformation = {
	// 	toaEventKey: event.event_key,
	// 	date: event.start_date
	// }

	let teamsList = []
	for (let team of teams) {
		teamsList.push(Number(team.team_key))
	}

	let matchNumbers = []
	let teamsByMatch = {}
	for (let station of stations) {
		let matchNumber = station.match_name.split('Quals ')[1]
		if (matchNumber) {
			if (!teamsByMatch[matchNumber]) {
				teamsByMatch[matchNumber] = station.teams.split(',')
				matchNumbers.push(matchNumber)
			}
		}
	}

	let scheduledMatches = []
	for (let matchNumber of matchNumbers) {
		teams = teamsByMatch[matchNumber]
		scheduledMatches.push({
			matchNumber: Number(matchNumber),
			teams:{	
				red1: Number(teams[0]),
				red2: Number(teams[1]),
				blue1: Number(teams[2]),
				blue2: Number(teams[3])
			}
		})
	}

	db.collection('events').save({
		// _id: eventInformation,
		_id: event.event_key,
		eventInformation:{
			date: new Date(event.start_date),
			eventName: event.event_name,
			locationName: location ? location.name : null,
			locationID: location ? location._id : null,
			teamsList: teamsList,
			season: event.season_key
		}
	}, function(err) {
		if (err) throw err
		db.collection('schedules').save({
			// _id:{
			// 	eventInformation: eventInformation
			// },
			_id: event.event_key,
			schedule: scheduledMatches
		}, function(err) {
			if (err) throw err
			completedEvents.push(event.event_key)
			finishIfDone(db)
		})
	})
}

function finishIfDone(db) {
	if (completedEvents.length === eventKeys.length) {
		db.close()
		console.log('Done saving locations, events, and schedules!')
	}
}