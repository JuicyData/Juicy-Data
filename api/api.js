var MongoClient = require('mongodb').MongoClient
var configDB = require('./../config/database.js')
ObjectId = require('mongodb').ObjectID
module.exports = function(app) {
//require('./module')(app) This is the example; template IF THERE ARE MORE APIs
app.get('/api', function(req, res) {
	res.send('api home')
})

app.get('/api/events/read', (req, res) =>{
	MongoClient.connect(configDB.url, function(err,db){
		if(err){
			console.log(err)
			res.status(500).send(err)
			return
		}
		
		db.collection('eventOut').findOne(
			{
				_id: req.query.eventId
			},
			function(err, eventDoc){
				if(err){
					console.log(err)
					res.status(500).send(err)
					db.close()
					return
				}else{
					if(eventDoc){ //NEED TO TEST THIS
						res.json(eventDoc)
						db.close()
					}else{		// if threre is no documents returned then:
						res.status(400).send('Event not found')
						db.close()
					}
				}
			}
		)
	})
})

app.get('/api/teams/read', (req, res) =>{
	MongoClient.connect(configDB.url, function(err,db){
		if(err){
			console.log(err)
			res.status(500).send(err)
			return
		}

		// res = {
		// 	teamName: 'abc',
		// 	current: {
		// 		eventInformation: eventInformation:{
		// 			date: ISODate(), //ISO Date of when it occured;
		// 			eventName: 'abc',
		// 			locationName: 'abc',	//Same as the name in the locations collection
		// 			locationID: ObjectId(), //ID of the location in the 'locations' collection
		// 			teamsList:[123, 123, 123],
		// 			season: 'Y1Y2', //for relic recovery 2017-2018 the season is '1718'
		// 		},
		// 		ranking: {},	//Just like the eventOut schema
		// 		matchHistory: [{}],	//Array of all the matchHisotrys from evenOut schema
		// 		averageScore: {}
		// 	},
		// 	old: []	//Schema is just like current expect its an Array for all events that are given
		// }

		//$eq: req.query.teamNumber
		
		db.collection('events').aggregate([
			{$match:{
				'eventInformation.teamsList': {$elemMatch:{
					$eq: Number(req.query.teamNumber)
				}}
			}},
			{$sort:{
				'eventInformation.date': -1
			}},
			{$lookup:{
				from:'eventOut',
				let: {eventToaEventKey: '$_id'},
				pipeline: [
					{$match:{$expr:
						{$eq: ['$_id', '$$eventToaEventKey']}
					}},
					{$unwind: '$ranking'},
					{$match:{
						'ranking.teamNumber': Number(req.query.teamNumber)
					}},
					{$unwind: '$averageScores'},
					{$match:{
						'averageScores.teamNumber': Number(req.query.teamNumber)
					}},
					{$unwind: '$matchHistory'},
					{$match:{$expr:{
						$or: [
							{$eq: ['$matchHistory.team1.teamNumber', Number(req.query.teamNumber)]},
							{$eq: ['$matchHistory.team2.teamNumber', Number(req.query.teamNumber)]}
						]
					}}},
					{$group:{
						_id:{
							_id: '$_id',
							lastUpdated: '$lastUpdated',
							ranking: '$ranking',
							averageScore: '$averageScores'
						},
						matchHistory: {$push: '$matchHistory'}
					}}
				],
				as:'eventOut'
			}},
			{$unwind:'$eventOut'},
			{$group:{
				_id: 'Anna Li',
				events: {$push:{
					_id: '$_id',
					eventInformation: '$eventInformation',
					lastUpdated: '$eventOut._id.lastUpdated',
					ranking: '$eventOut._id.ranking',
					matchHistory: '$eventOut.matchHistory',
					averageScore: '$eventOut._id.averageScore'
				}}
			}},
			{$facet:{
				current:[
					{$project:{
						_id: 0,
						event: {$arrayElemAt:['$events',0]}
					}}
				],
				old:[
					{$project:{
						_id: 0,
						event: {$slice:[
							'$events',{$multiply:[{$subtract:[{$size:'$events'},1]},-1]}
						]}
					}}
				]
			}},
			{$lookup:{
				from:'teams',
				pipeline: [
					{$match:{$expr:
						{$eq: ['$_id', Number(req.query.teamNumber)]}
					}},
					{$project:{
						_id:0,
						team_name_short:1
					}}
				],
				as:'teamName'
			}},
			{$project:{
				teamName: {$arrayElemAt:['$teamName',0]},
				current: {$arrayElemAt:['$current.event',0]},
				old: {$arrayElemAt:['$old.event',0]}
			}},
			{$addFields:{
				teamName: '$teamName.team_name_short'
			}}
		],
			function(err, eventsDocs){
				if(err){
					console.log(err)
					res.status(500).send(err)
					db.close()
					return
				}else{
					if(eventsDocs){ //NEED TO TEST THIS
						res.json(eventsDocs[0])
						db.close()
					}else{		// if threre is no documents returned then:
						res.status(400).send('Events not found')
						db.close()
					}
				}
			}
		)
	})
})

}