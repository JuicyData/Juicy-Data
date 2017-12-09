var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017/JuicyData"

var apiKey = require('../config/apiKey.js')
var axios = require('axios')
var toaApi = axios.create({
	baseURL: 'http://theorangealliance.org/apiv2/',
	timeout: 10000,
	headers: {'X-Application-Origin': 'JuicyData', 'X-TOA-Key': apiKey}
})
var eventKeys = ['1718-NCAL-RWC', '1617-CASD-GAUS'] // Find these at theorangealliance.org. Type 'CASD' in the search box, or the event name.

var completedEvents = []

module.exports = function() {
	getData()
}

function getData() {
	completedEvents = []
	MongoClient.connect(url, function(err, db) {
		if (err) throw err
		for (let eventKey of eventKeys) {
			db.collection('events').findOne({'eventInformation.toaEventKey': eventKey}, function(err, data) {
				if (err) throw err
				if (data) {
					console.log(eventKey + ' event already exists in the database')
					completedEvents.push(eventKey)
					finishIfDone(db)
				} else {
					console.log('Writing ' + eventKey + ' event!')
					toaApi.get('/event/' + eventKey).then(function(response) {
						let event = response.data[0]
						toaApi.get('/event/' + eventKey + '/teams').then(function(response) {
							let teams = response.data
							toaApi.get('/event/' + eventKey + '/matches/stations').then(function(response) {
								let stations = response.data
								if (stations.length > 0) {
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
												db.collection('locations').insert(location, function(err) {
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
	let eventInformation = {
		name: event.event_name,
		date: event.start_date,
		locationID: location ? location._id : null
	}

	let teamsList = []
	for (let team of teams) {
		teamsList.push(Number(team.team_key))
	}

	let matchNumbers = []
	let allStations = {}
	for (let station of stations) {
		let matchNumber = station.match_name.split('Quals ')[1]
		if (matchNumber) {
			if (!allStations[matchNumber]) {
				allStations[matchNumber] = []
				matchNumbers.push(matchNumber)
			}
			allStations[matchNumber].push(station)
		}
	}

	let scheduledMatches = []
	for (let matchNumber of matchNumbers) {
		let matchStations = allStations[matchNumber]
		let teams = {
			red: [],
			blue: []
		}
		for (let station of matchStations) {
			allianceCode = station.station_key.charAt(station.station_key.length-2)
			if (allianceCode === 'R') {
				teams.red.push(Number(station.team_key))
			} else if (allianceCode === 'B') {
				teams.blue.push(Number(station.team_key))
			}
		}
		scheduledMatches.push({
			matchNumber: Number(matchNumber),
			teams:{	
				red1: teams.red[0],
				red2: teams.red[1],
				blue1: teams.blue[0],
				blue2: teams.blue[1]
			}
		})
	}

	db.collection('events').insert({
		_id: eventInformation,
		eventInformation:{
			eventName: event.event_name,
			locationName: location ? location.name : null,
			teamsList: teamsList,
			season: event.season_key,
			toaEventKey: event.event_key
		}
	}, function(err) {
		if (err) throw err
		db.collection('schedules').insert({
			_id:{
				eventInformation: eventInformation
			},
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