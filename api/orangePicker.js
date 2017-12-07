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
						score:'$resultInformation.score'
					}},
					{$unwind:'$teams'},
					{$group:{
						_id:'$teams',
						record:{
							wins:{$sum:{$cond:[
								{$eq:['red','$resultInformation.winner']},
								1,	//True case
								0	//False case
							]}},
							losses:{$sum:{$cond:[
								{$eq:['blue','$resultInformation.winner']},	//Since this is focusing on the red teams
								1,	//True case
								0	//False case
							]}},
							ties:{$sum:{$cond:[
								{$eq:['tie','$resultInformation.winner']},
								1,	//True case
								0	//False case
							]}}
						},
						rankingPoints:{$sum:{$cond:[
							{$eq:['red','$resultInformation.winner']},	//This is unbias
							'$resultInformation.score.total.blue',	//True case; If red wins then take blue total score
							'$resultInformation.score.total.red'	//False case; If red loses then take red total score; or if tie then take red score
						]}}
					}}
				],
				blue:[
					{$project:{
						teams:['$_id.matchInformation.teams.blue1','$_id.matchInformation.teams.blue2'],
						score:'$resultInformation.score'
					}},
					{$unwind:'$teams'},
					{$group:{
						_id:'$teams',
						record:{
							wins:{$sum:{$cond:[
								{$eq:['blue','$resultInformation.winner']},
								1,	//True case
								0	//False case
							]}},
							losses:{$sum:{$cond:[
								{$eq:['red','$resultInformation.winner']},	//Since this is focusing on the red teams
								1,	//True case
								0	//False case
							]}},
							ties:{$sum:{$cond:[
								{$eq:['tie','$resultInformation.winner']},
								1,	//True case
								0	//False case
							]}}
						},
						rankingPoints:{$sum:{$cond:[	//CHECK IF THIS IS TOTAL SCORE OR FINAL SCORE!
							{$eq:['red','$resultInformation.winner']},	//This is unbias
							'$resultInformation.score.total.blue',	//True case; If red wins then take blue total score
							'$resultInformation.score.total.red'	//False case; If red loses then take red total score; or if tie then take red score
						]}}
					}}
				]
			}},
			{$group:{
				_id:'$_id',
				record:{
					wins:{$sum:'$record.wins'},
					losses:{$sum:'$record.losses'},
					ties:{$sum:'$record.ties'}
				},
				qualifyingPoints:{$sum:[
					{$multiply:[2,'$record.wins']},
					'$record.ties'
				]},	//Ties represent 1 point while wins represent 2 points
				rankingPoints:{$sum:'$rankingPoints'}
			}},
			{$sort:{
				qualifyingPoints: 1,	//Sorting by QP then RP
				rankingPoints: 1
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
				localField:'schedule.match',
				foreignField:'matchInformation.matchNumber',
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
						score:'$matchData.resultsInformation.score.total.red',
						marginalScore:{$subtract:['$matchData.resultsInformation.score.total.red', '$matchData.resultsInformation.score.total.blue']}
					},
					{
						//teams:['$schedule.teams.blue1','$schedule.teams.blue2'],
						team1:'$schedule.teams.blue1',
						team2:'$schedule.teams.blue2',
						score:'$matchData.resultsInformation.score.total.blue',
						marginalScore:{$subtract:['$matchData.resultsInformation.score.total.blue', '$matchData.resultsInformation.score.total.red']}
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