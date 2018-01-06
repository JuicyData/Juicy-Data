//orangePicker by Michael Leonffu
var MongoClient = require('mongodb').MongoClient
var configDB = require('./../config/database.js')
ObjectId = require('mongodb').ObjectID

/*
Picks the oranges that manager told to pick; dose all the calls to the database to get the data for all the peelers and calculators

Can pick oranges from the gameData or matchData collections
*/

function orangePickerRanking(orchard, oranges){	//only supports matchData; rankings rightnow
	console.log('[START]-orangePickerRanking')

	// orchard should be in this form:
	// {
	// 	name: 'abc',
	// 	date: ISODate(), //ISO Date of when it occured; 
	// 	locationID: ObjectId() //ID of the location in the 'places' collection
	// }

	var pickerTimer = new Date()
	MongoClient.connect(configDB.url, function(err,db){
		if(err){
			console.log(err)
			return
		}
		db.collection('matchData').aggregate([
			{$match:{'_id.eventInformation':orchard}},
			{$facet:{	//There IS a better way to do this QQ
				red:[
					{$project:{
						teams:['$_id.matchInformation.teams.red1','$_id.matchInformation.teams.red2'],
						score:'$resultInformation'
					}},
					{$unwind:'$teams'},
					{$group:{
						_id:'$teams',
						wins:{$sum:{$cond:[
							{$eq:['red','$score.winner']},
							1,	//True case
							0	//False case
						]}},
						losses:{$sum:{$cond:[
							{$eq:['blue','$score.winner']},	//Since this is focusing on the red teams
							1,	//True case
							0	//False case
						]}},
						ties:{$sum:{$cond:[
							{$eq:['tie','$score.winner']},
							1,	//True case
							0	//False case
						]}},
						rankingPoints:{$sum:{$cond:[
							{$eq:['red','$score.winner']},	//This is unbias
							'$score.score.total.blue',	//True case; If red wins then take blue total score
							'$score.score.total.red'	//False case; If red loses then take red total score; or if tie then take red score
						]}}
					}}
				],
				blue:[
					{$project:{
						teams:['$_id.matchInformation.teams.blue1','$_id.matchInformation.teams.blue2'],
						score:'$resultInformation'
					}},
					{$unwind:'$teams'},
					{$group:{
						_id:'$teams',
						wins:{$sum:{$cond:[
							{$eq:['blue','$score.winner']},
							1,	//True case
							0	//False case
						]}},
						losses:{$sum:{$cond:[
							{$eq:['red','$score.winner']},	//Since this is focusing on the red teams
							1,	//True case
							0	//False case
						]}},
						ties:{$sum:{$cond:[
							{$eq:['tie','$score.winner']},
							1,	//True case
							0	//False case
						]}},
						rankingPoints:{$sum:{$cond:[	//CHECK IF THIS IS TOTAL SCORE OR FINAL SCORE!
							{$eq:['red','$score.winner']},	//This is unbias
							'$score.score.total.blue',	//True case; If red wins then take blue total score
							'$score.score.total.red'	//False case; If red loses then take red total score; or if tie then take red score
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
			}}
		],function(err,pickedOranges){
			console.log('Operation orangePickerRanking time(Milliseconds):',new Date(new Date()-pickerTimer).getMilliseconds())
			console.log('[DONE]-orangePickerRanking')
			db.close()	//We don't need the database anymore
			if(err){
				console.log(err)
			}else{
				oranges(pickedOranges)	//Thses oranges don't need peeling;	this is the call back.
			}
		})
	})
}

function orangePickerMatchHistory(orchard, oranges){

}

function orangePickerAverageScores(orchard, oranges){
	//Sets up all the data required to calculate all the differnt averages using juicy caluclator; formating is done in peeling process
	//This make sure to find the oranges that are important for calculating OPR; schedule and matchdata
	console.log('[START]-orangePickerAverageScores')
	var pickerTimer = new Date()
	MongoClient.connect(configDB.url, function(err,db){
		//If there is an error while connecting to the database
		if(err){
			console.log(err)
			return
		}

		//Make the schedule and matchData.....
		db.collection('schedules').aggregate([
			{$match:{'_id':orchard}},
			{$unwind:'$schedule'},
			{$lookup:{
				from:'matchData',
				let: {matchNumber: '$schedule.matchNumber', eventInformation: '$_id'},
				pipeline: [
					{$match:{$expr:{$and:[
						{$eq: ['$_id.eventInformation', '$$eventInformation']},
						{$eq: ['$_id.matchInformation.matchNumber', '$$matchNumber']}
					]}}}
				],
				// localField:'schedule.match',
				// foreignField:'matchInformation.matchNumber',
				as:'matchData'
			}},
			{$unwind:'$matchData'}, //Maybe Uncomment
			{$project:{
				_id:0,
				teamsScore:[
					{
						//teams:['$schedule.teams.red1','$schedule.teams.red2'],
						team1:'$schedule.teams.red1',
						team2:'$schedule.teams.red2',
						score:'$matchData.resultInformation.score.total.red',
						marginalScore:{$subtract:['$matchData.resultInformation.score.total.red', '$matchData.resultInformation.score.total.blue']}
					},
					{
						//teams:['$schedule.teams.blue1','$schedule.teams.blue2'],
						team1:'$schedule.teams.blue1',
						team2:'$schedule.teams.blue2',
						score:'$matchData.resultInformation.score.total.blue',
						marginalScore:{$subtract:['$matchData.resultInformation.score.total.blue', '$matchData.resultInformation.score.total.red']}
					}
				]
			}},
			{$unwind:'$teamsScore'},
			{$facet:{
				teamsScore:[
					{$project:{
						//teams:'$teamsScore.teams',
						teams:['$teamsScore.team1','$teamsScore.team2'],
						score:'$teamsScore.score',
						marginalScore:'$teamsScore.marginalScore'
					}
				}],
				teamList:[
					{$group:{
						_id:'Anna Li',
						teamsList:{$addToSet:'$teamsScore.team1'},
						teamsList:{$addToSet:'$teamsScore.team2'}
					}}
				]
			}},
			{$unwind:'$teamList'},
			{$project:{
				teamsScore:1,
				teamsList:'$teamList.teamsList'
			}}
		], teamsScores)

		// {
		// 	teamsScore: [
		// 		{
		// 			teams:[123,123], Team numbers
		// 			score:[123] score these teams got
		//			marginalScore:[123] the marginalScore thses teams got
		// 		}
		// 	],
		// 	teamList:[123,123,123,] Team numbers unique list
		// }

		//Callback; the function that runs after the dataase gives a responce
		function teamsScores(err, pickedOranges){
			console.log('Operation orangePickerAverageScores time(Milliseconds):',new Date(new Date()-pickerTimer).getMilliseconds())
			console.log('[DONE]-orangePickerAverageScores')
			db.close()
			if(err){
				console.log(err)
			}else if(!(0 in pickedOranges)){
				console.log('Failed to get docs')
			}else{
				oranges(pickedOranges)	//All is good; this is call back
			}
		}
	})
}

module.exports = {
	orangePickerRanking: orangePickerRanking,
	orangePickerMatchHistory: orangePickerMatchHistory,
	orangePickerAverageScores: orangePickerAverageScores
}
// To use in another file:
// var orangePicker = require('./orangePicker')
// orangePicker.orangePickerRanking(orchard, oranges)
// Where oranges is the callback function returning a json