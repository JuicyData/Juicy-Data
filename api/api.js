//api by Michael Leonffu
module.exports = function(app, db, ObjectId) {
//require('./module')(app) This is the example; template IF THERE ARE MORE APIs
app.get('/api', function(req, res) {
	res.send('api home')
})

app.get('/api/events/read', (req, res) =>{
	db.collection('eventOut').findOne(
		{
			_id: req.query.eventId
		},
		function(err, eventDoc){
			if(err){
				console.log(err)
				res.status(500).send(err)
				return
			}else{
				if(eventDoc){ //NEED TO TEST THIS
					res.json(eventDoc)
				}else{		// if threre is no documents returned then:
					res.status(400).send('Event not found')
				}
			}
		}
	)
})

app.get('/api/predict', (req, res) =>{

	var algorithms = require('./algorithms/algorithms')

	// req.query = {
	// 	eventId: 'abc',
	// 	algorithm: 'abc',
	// 	alliance1team1: 123,
	// 	alliance1team2: 123,
	// 	alliance2team1: 123,
	// 	alliance2team2: 123
	// }

	// res = {
	// 	prediction: {		//REQUIRED?
	// 		winner: 'abc',	//Alliance1 or Alliance2
	// 		chance: .123,	//Chance this is winner in 00.00%	-1 if no value
	// 		alliance1: {
	// 			score: .123	//predicted score
	// 		},
	// 		alliance2: {
	// 			score: .123
	// 		}
	// 	},
	// 	model: [	//For every match given
	// 		{
	// 			matchNumber: 123,
	// 			prediction: 'abc',	//red or blue
	// 			blueScore: 123,
	// 			redScore: 123,
	// 			certainty: .123		//as 00.00%; -1 if no value
	// 		}
	// 	]
	// }

	console.log(req.query)

	db.collection('events').aggregate([
		{$match: {
			_id: String(req.query.eventId)
		}},
		{$lookup:{
			from: 'matchData',
			let: {eventToaEventKey: '$_id'},
			pipeline: [
				{$match:{$expr:
					{$eq: ['$_id.toaEventKey', '$$eventToaEventKey']}
				}},
				{$project:{
					_id: 0,
					matchNumber: '$_id.matchInformation.matchNumber',
					teams: '$_id.matchInformation.teams',
					winner: '$resultInformation.winner',
					score: '$resultInformation.score'
				}}
			],
			as: 'matchData'
		}},
		{$lookup:{
			from: 'gameData',
			let: {eventToaEventKey: '$_id'},
			pipeline: [
				{$match:{$expr:
					{$eq: ['$_id.toaEventKey', '$$eventToaEventKey']}
				}},
				{$project:{
					_id: 0,
					matchNumber: '$_id.matchInformation.matchNumber',
					teams: '_id.matchInformation.teams',
					gameInformation: '$gameInformation'
				}}
			],
			as: 'gameData'
		}},
		{$project:{
			metaData: {
				toaEventKey: '$_id',
				matches: 101
			},
			data: {
				matchData: '$matchData',
				gameData: '$gameData'
			}
		}}
	], 
		function(err, eventsDocs){
			if(err){
				console.log(err)
				res.status(500).send(err)
				return
			}else{
				if(eventsDocs){ //NEED TO TEST THIS
					res.json(algorithms.algorithmLoader('simpleOPR',eventsDocs[0],{
						alliance1: {
							team1: Number(req.query.alliance1team1),
							team2: Number(req.query.alliance1team2)
						},
						alliance2: {
							team1: Number(req.query.alliance2team1),
							team2: Number(req.query.alliance2team2)
						},
					}))
				}else{		// if threre is no documents returned then:
					res.status(400).send('Events not found')
				}
			}
		}
	)

})

app.get('/api/teams/read', (req, res) =>{

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
				{$group:{
					_id: '$matchHistory.matchNumber',
					eventOut: {$push:'$$ROOT'}
				}},
				{$project:{
					red: {$arrayElemAt:['$eventOut',0]},
					blue: {$arrayElemAt:['$eventOut',1]}
				}},
				{$match:{$expr:{
					$or: [
						{$eq: ['$red.matchHistory.team1.teamNumber', Number(req.query.teamNumber)]},
						{$eq: ['$red.matchHistory.team2.teamNumber', Number(req.query.teamNumber)]},
						{$eq: ['$blue.matchHistory.team1.teamNumber', Number(req.query.teamNumber)]},
						{$eq: ['$blue.matchHistory.team2.teamNumber', Number(req.query.teamNumber)]}
					]
				}}},
				{$project:{
					_id: '$red._id',
					lastUpdated: '$red.lastUpdated',
					eventInformation: '$red.eventInformation',
					ranking: '$red.ranking',
					matchHistory: {
						red: '$red.matchHistory',
						blue: '$blue.matchHistory'
					},
					averageScores: '$red.averageScores'
				}},
				{$sort:{
					'matchHistory.red.matchNumber': 1
				}},
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
				}}
			],
			as:'teamInformation'
		}},
		{$unwind:'$teamInformation'},
		{$project:{
			teamName: {$arrayElemAt: [{$split: ['$teamInformation.team_name_short', ', Team #']},0]},
			teamNumber: Number(req.query.teamNumber),
			current: {$arrayElemAt:['$current.event',0]},
			old: {$arrayElemAt:['$old.event',0]}
		}}
		// {$addFields:{
		// 	teamName: {$arrayElemAt: [{$split: ['$teamInformation.team_name_short', ', Team #']},0]},
		// 	teamNumber: Number(req.query.teamNumber)
		// }}
	],
		function(err, eventsDocs){
			if(err){
				console.log(err)
				res.status(500).send(err)
				return
			}else{
				if(eventsDocs){ //NEED TO TEST THIS
					res.json(eventsDocs[0])
				}else{		// if threre is no documents returned then:
					res.status(400).send('Events not found')
				}
			}
		}
	)
})

}
