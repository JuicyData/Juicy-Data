//orangePicker by Michael Leonffu

// var MongoClient = require('mongodb').MongoClient
// var configDB = require('./../config/database.js')
// ObjectId = require('mongodb').ObjectID

/*
Picks the oranges that manager told to pick; dose all the calls to the database to get the data for all the peelers and calculators

Can pick oranges from the gameData or matchData collections
*/
function orangePicker(mongodb){

function orangePickerRanking(orchard, oranges){	//only supports matchData; rankings rightnow
	console.log('[START]-orangePickerRanking')

	// orchard should be in this form:
	// {
	// 	name: 'abc',
	// 	date: ISODate(), //ISO Date of when it occured; 
	// 	locationID: ObjectId() //ID of the location in the 'places' collection
	// }

	var pickerTimer = new Date()
	// MongoClient.connect(configDB.url, function(err,db){
	// 	if(err){
	// 		console.log(err)
	// 		return
	// 	}
		mongodb.db.collection('matchData').aggregate([
			{$match:{'_id.toaEventKey':orchard}},
			{$lookup:{
				from:'schedules',
				let: {matchNumber: '$_id.matchInformation.matchNumber', toaEventKey: '$_id.toaEventKey'},
				pipeline: [
					{$match:{$expr:
						{$eq: ['$_id', '$$toaEventKey']}
					}},
					{$unwind:'$schedule'},
					{$match:{$expr:
						{$eq: ['$schedule.matchNumber', '$$matchNumber']}
					}}
				],
				// localField:'schedule.match',
				// foreignField:'matchInformation.matchNumber',
				as:'schedules'
			}},
			{$unwind:'$schedules'},
			{$addFields:{
				teams: '$schedules.schedule.teams'
			}},
			{$facet:{	//There IS a better way to do this QQ
				red:[
					{$project:{
						teams:['$teams.red1','$teams.red2'],
						score:'$resultInformation'
					}},
					{$unwind:'$teams'},
					{$group:{
						_id:'$teams.teamNumber',
						wins:{$sum:{$cond:[
							{$and:[
								{$eq:['red','$score.winner']},
								{$eq:[false,'$teams.surrogate']}
							]},
							1,	//True case
							0	//False case
						]}},
						losses:{$sum:{$cond:[
							{$and:[
								{$eq:['blue','$score.winner']},
								{$eq:[false,'$teams.surrogate']}
							]},	//Since this is focusing on the red teams
							1,	//True case
							0	//False case
						]}},
						ties:{$sum:{$cond:[
							{$and:[
								{$eq:['tie','$score.winner']},
								{$eq:[false,'$teams.surrogate']}
							]},
							1,	//True case
							0	//False case
						]}},
						// rankingPoints:{$sum:{$cond:[
						// 	{$and:[
						// 		{$eq:['red','$score.winner']},
						// 		{$eq:[false,'$teams.surrogate']}
						// 	]},	//This is unbias
						// 	'$score.score.total.blue',	//True case; If red wins then take blue total score
						// 	'$score.score.total.red'	//False case; If red loses then take red total score; or if tie then take red score
						// ]}}
						rankingPoints:{$sum:{$cond:[
							{$eq:[false,'$teams.surrogate']},
							{$cond:[
								{$eq:['red','$score.winner']}, //This is unbias
								'$score.score.total.blue',	//True case; If red wins then take blue total score
								'$score.score.total.red'	//False case; If red loses then take red total score; or if tie then take red score
							]},
							0
						]}}
					}}
				],
				blue:[
					{$project:{
						teams:['$teams.blue1','$teams.blue2'],
						score:'$resultInformation'
					}},
					{$unwind:'$teams'},
					{$group:{
						_id:'$teams.teamNumber',
						wins:{$sum:{$cond:[
							{$and:[
								{$eq:['blue','$score.winner']},
								{$eq:[false,'$teams.surrogate']}
							]},
							1,	//True case
							0	//False case
						]}},
						losses:{$sum:{$cond:[
							{$and:[
								{$eq:['red','$score.winner']},
								{$eq:[false,'$teams.surrogate']}
							]},	//Since this is focusing on the red teams
							1,	//True case
							0	//False case
						]}},
						ties:{$sum:{$cond:[
							{$and:[
								{$eq:['tie','$score.winner']},
								{$eq:[false,'$teams.surrogate']}
							]},
							1,	//True case
							0	//False case
						]}},
						rankingPoints:{$sum:{$cond:[
							{$eq:[false,'$teams.surrogate']},
							{$cond:[
								{$eq:['red','$score.winner']}, //This is unbias
								'$score.score.total.blue',	//True case; If red wins then take blue total score
								'$score.score.total.red'	//False case; If red loses then take red total score; or if tie then take red score
							]},
							0
						]}}
					}}
				]
			}},
			{$project:{root:{$concatArrays:['$red','$blue']}}},
			{$unwind:'$root'},
			{$replaceRoot:{newRoot: '$root'}},
			{$group:{
				_id:'$_id',
				wins:{$sum:'$wins'},
				losses:{$sum:'$losses'},
				ties:{$sum:'$ties'},
				// qualifyingPoints:{$sum:[
				// 	'$wins',
				// 	'$wins',
				// 	//{$multiply:[2,'$wins']},
				// 	'$ties'
				// ]},	//Ties represent 1 point while wins represent 2 points
				rankingPoints:{$sum:'$rankingPoints'}
				// rankingPoints:{$sum:{$cond:[
				// 	{$and:[
				// 		{$eq:['red','$score.winner']},
				// 		{$eq:[false,'$teams.surrogate']}
				// 	]},	//This is unbias
				// 	'$score.score.total.blue',	//True case; If red wins then take blue total score
				// 	'$score.score.total.red'	//False case; If red loses then take red total score; or if tie then take red score
				// ]}}
			}},
			{$addFields:{
				qualifyingPoints:{$sum:[
					{$multiply:[2,'$wins']},
					'$ties'
				]} //Ties represent 1 point while wins represent 2 points
			}},
			{$sort:{
				qualifyingPoints: -1,	//Sorting by QP then RP
				rankingPoints: -1
			}},
			{$lookup:{
				from:'teams',
				let: {teamNumber: '$_id'},
				pipeline: [
					{$match:{$expr:
						{$eq: ['$_id', '$$teamNumber']}
					}},
					{$project:{
						_id:0,
						team_name_short:1
					}}
				],
				// localField:'schedule.match',
				// foreignField:'matchInformation.matchNumber',
				as:'teamName'
			}},
			{$unwind:'$teamName'},
			{$project:{
				_id: '$_id',
				wins: '$wins',
				losses: '$losses',
				ties: '$ties',
				rankingPoints: '$rankingPoints',
				qualifyingPoints: '$qualifyingPoints',
				teamName: {$arrayElemAt: [{$split: ['$teamName.team_name_short', ', Team #']},0]}
			}}
		],function(err,pickedOranges){
			console.log('Operation orangePickerRanking time(Milliseconds):',new Date(new Date()-pickerTimer).getMilliseconds())
			console.log('[DONE]-orangePickerRanking')
			// db.close()	//We don't need the database anymore
			if(err){
				console.log(err)
			}else{
				oranges(pickedOranges)	//Thses oranges don't need peeling;	this is the call back.
			}
		})
	// })
}

function orangePickerMatchHistory(orchard, oranges){
	//Gets all the stuff for match history using schedule and gamedata
	console.log('[START]-orangePickerMatchHistory')
	var pickerTimer = new Date()
	// MongoClient.connect(configDB.url, function(err,db){
	// 	//If there is an error while connecting to the database
	// 	if(err){
	// 		console.log(err)
	// 		return
	// 	}

		//Make the schedule and matchData.....
		mongodb.db.collection('schedules').aggregate([
			{$match:{'_id':orchard}},
			{$unwind:'$schedule'},
			{$facet:{
				red:[
					{$project:{
						_id: {
							matchNumber: '$schedule.matchNumber',
							alliance: 'red'
						},
						teams: {
							team1:'$schedule.teams.red1',
							team2:'$schedule.teams.red2'
						}
					}}
				],
				blue:[
					{$project:{
						_id: {
							matchNumber: '$schedule.matchNumber',
							alliance: 'blue'
						},
						teams: {
							team1:'$schedule.teams.blue1',
							team2:'$schedule.teams.blue2'
						}
					}}
				]
			}},
			{$project:{
				schedule: {
					$concatArrays: [
						'$red',
						'$blue'
					]
				}
			}},
			{$unwind:'$schedule'},
			{$replaceRoot:{
				newRoot: '$schedule'
			}},
			{$lookup:{
				from:'gameData',
				let: {matchNumber: '$_id.matchNumber', alliance: '$_id.alliance'},
				pipeline: [
					{$match:{$expr:{$and:[
						{$eq: ['$_id.toaEventKey', orchard]},
						{$eq: ['$_id.matchInformation.matchNumber', '$$matchNumber']},
						{$eq: ['$_id.matchInformation.robotAlliance', '$$alliance']}
					]}}}
				],
				// localField:'schedule.match',
				// foreignField:'matchInformation.matchNumber',
				as:'gameData'
			}},
			{$unwind:'$gameData'},
			{$lookup:{
				from:'matchData',
				let: {matchNumber: '$_id.matchNumber'},
				pipeline: [
					{$match:{$expr:{$and:[
						{$eq: ['$_id.toaEventKey', orchard]},
						{$eq: ['$_id.matchInformation.matchNumber', '$$matchNumber']}
					]}}}
				],
				// localField:'schedule.match',
				// foreignField:'matchInformation.matchNumber',
				as:'matchData'
			}},
			{$unwind:'$matchData'},
			{$sort:{
				'_id.matchNumber': 1
			}}
		], matchHistory)

		// {
		// 	_id: {
		// 		matchNumber: 123,
		// 		alliance: 'abc' //blue or red
		// 	},
		// 	teams: {
		// 		team1: 123,
		// 		team2: 123
		// 	},
		// 	gameData: //Game Data
		// }

		//Callback; the function that runs after the dataase gives a responce
		function matchHistory(err, pickedOranges){
			console.log('Operation orangePickerMatchHistory time(Milliseconds):',new Date(new Date()-pickerTimer).getMilliseconds())
			console.log('[DONE]-orangePickerMatchHistory')
			// db.close()
			if(err){
				console.log(err)
			}else if(!(0 in pickedOranges)){
				console.log('Failed to get docs')
			}else{
				oranges(pickedOranges)	//All is good; this is call back
			}
		}
	// })
}

function orangePickerAverageScores(orchard, oranges){
	//Sets up all the data required to calculate all the differnt averages using juicy caluclator; formating is done in peeling process
	//This make sure to find the oranges that are important for calculating OPR; schedule and matchdata
	console.log('[START]-orangePickerAverageScores')
	var pickerTimer = new Date()
	// MongoClient.connect(configDB.url, function(err,db){
	// 	//If there is an error while connecting to the database
	// 	if(err){
	// 		console.log(err)
	// 		return
	// 	}

		//Make the schedule and matchData.....
		mongodb.db.collection('schedules').aggregate([
			{$match:{'_id':orchard}},
			{$unwind:'$schedule'},
			{$lookup:{
				from:'matchData',
				let: {matchNumber: '$schedule.matchNumber', toaEventKey: '$_id'},
				pipeline: [
					{$match:{$expr:{$and:[
						{$eq: ['$_id.toaEventKey', '$$toaEventKey']},
						{$eq: ['$_id.matchInformation.matchNumber', '$$matchNumber']}
					]}}}
				],
				// localField:'schedule.match',
				// foreignField:'matchInformation.matchNumber',
				as:'matchData'
			}},
			{$unwind:'$matchData'},
			{$lookup:{
				from:'gameData',
				let: {matchNumber: '$schedule.matchNumber', toaEventKey: '$_id'},
				pipeline: [
					{$match:{$expr:{$and:[
						{$eq: ['$_id.toaEventKey', '$$toaEventKey']},
						{$eq: ['$_id.matchInformation.matchNumber', '$$matchNumber']}
					]}}}
				],
				// localField:'schedule.match',
				// foreignField:'matchInformation.matchNumber',
				as:'gameData'
			}},
			{$unwind:'$gameData'},
			{$facet:{
				red:[
					{$match:{
						'gameData._id.matchInformation.robotAlliance': 'red'
					}},
					{$project:{
						_id:0,
						teamsScore:{
							//teams:['$schedule.teams.red1','$schedule.teams.red2'],
							team1:'$schedule.teams.red1.teamNumber',
							team2:'$schedule.teams.red2.teamNumber',
							score: {
								auto: '$matchData.resultInformation.score.auto.red',
								driver: '$matchData.resultInformation.score.driver.red',
								end: '$matchData.resultInformation.score.end.red',
								total: '$matchData.resultInformation.score.total.red',
								penalty: '$matchData.resultInformation.score.penalty.red',
								final: '$matchData.resultInformation.score.final.red',
								marginalScore: {$subtract:['$matchData.resultInformation.score.total.red', '$matchData.resultInformation.score.total.blue']}
							},
							gameData: '$gameData.gameInformation'
						}
					}}
				],
				blue:[
					{$match:{
						'gameData._id.matchInformation.robotAlliance': 'blue'
					}},
					{$project:{
						_id:0,
						teamsScore:{
							//teams:['$schedule.teams.blue1','$schedule.teams.blue2'],
							team1:'$schedule.teams.blue1.teamNumber',
							team2:'$schedule.teams.blue2.teamNumber',
							score: {
								auto: '$matchData.resultInformation.score.auto.blue',
								driver: '$matchData.resultInformation.score.driver.blue',
								end: '$matchData.resultInformation.score.end.blue',
								total: '$matchData.resultInformation.score.total.blue',
								penalty: '$matchData.resultInformation.score.penalty.blue',
								final: '$matchData.resultInformation.score.final.blue',
								marginalScore: {$subtract:['$matchData.resultInformation.score.total.blue', '$matchData.resultInformation.score.total.red']}
							},
							gameData: '$gameData.gameInformation'
						}
					}}
				]
			}},
			{$project:{
				combinedArrays: {
					$concatArrays: [
						'$red',
						'$blue'
					]
				}
			}},
			{$unwind:'$combinedArrays'},
			{$replaceRoot:{
				newRoot: '$combinedArrays'
			}},
			{$unwind:'$teamsScore'},
			{$facet:{
				teamsScore:[
					{$project:{
						//teams:'$teamsScore.teams',
						teams:['$teamsScore.team1','$teamsScore.team2'],
						score:'$teamsScore.score',
						gameData: '$teamsScore.gameData'
					}
				}],
				teamList:[
					{$group:{
						_id:'Anna Li',
						teamsList1:{$addToSet:'$teamsScore.team1'},
						teamsList2:{$addToSet:'$teamsScore.team2'}
					}},
					{$project:{
						_id:0,
						teamsList: {$concatArrays:['$teamsList1','$teamsList2']}
					}},
					{$unwind:'$teamsList'},
					{$group:{
						_id:'Anna Li',
						teamList:{$addToSet:'$teamsList'}
					}}
				]
			}},
			{$unwind:'$teamList'},
			{$project:{
				teamsScore:1,
				teamsList:'$teamList.teamList'
			}}
		], teamsScores)

		// {
		// 	teamsScore: [
		// 		{
		// 			teams:[123,123], Team numbers
		// 			score:{
		// 				auto: 123,
		// 				driver: 123,
		// 				end: 123,
		// 				total: 123,
		// 				penalty: 123,
		// 				final: 123,
		// 				marginalScore: 123
		// 			}, scores these teams got
		// 			gameData:{
		// 				auto:{},
		// 				driver:{},
		// 				end:{}
		// 			}	All the game elements 
		// 		}
		// 	],
		// 	teamList:[123,123,123,] Team numbers unique list
		// }

		//Callback; the function that runs after the dataase gives a responce
		function teamsScores(err, pickedOranges){
			console.log('Operation orangePickerAverageScores time(Milliseconds):',new Date(new Date()-pickerTimer).getMilliseconds())
			console.log('[DONE]-orangePickerAverageScores')
			// db.close()
			if(err){
				console.log(err)
			}else if(!(0 in pickedOranges)){
				console.log('Failed to get docs')
			}else{
				console.log('pickedOranges',pickedOranges)
				oranges(pickedOranges)	//All is good; this is call back
			}
		}
	// })
}
return {
	orangePickerRanking: orangePickerRanking,
	orangePickerMatchHistory: orangePickerMatchHistory,
	orangePickerAverageScores: orangePickerAverageScores
}

}

module.exports = orangePicker
	// orangePickerRanking: orangePickerRanking,
	// orangePickerMatchHistory: orangePickerMatchHistory,
	// orangePickerAverageScores: orangePickerAverageScores


// To use in another file:
// var orangePicker = require('./orangePicker')
// orangePicker.orangePickerRanking(orchard, oranges)
// Where oranges is the callback function returning a json