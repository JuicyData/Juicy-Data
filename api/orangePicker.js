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
	// eventInformation:{
	// 	name: 'abc',
	// 	date: ISODate(), //ISO Date of when it occured; 
	// 	locationID: ObjectId() //ID of the location in the 'places' collection
	// }

	var pickerTimer = new Date()

	db.collection('matchData').aggregate([
		{$match:{'_id.eventInformation':orchard}},
		{$facet:{	//There IS a better way to do this QQ
			red:[
				{$project:{
					teams:['$_id.matchInformation.teams.red1','$_id.matchInformation.teams.red2'],
					score:'$resultInformation.score'
				}},
				{$unwind:'teams'},
				{$group:{
					_id:'$teams',
					record:{
						wins:{$sum:{$cond:{
							{$eq:['red','$resultInformation.winner']},
							1,	//True case
							0	//False case
						}}},
						losses:{$sum:{$cond:{
							{$eq:['blue','$resultInformation.winner']},	//Since this is focusing on the red teams
							1,	//True case
							0	//False case
						}}},
						ties:{$sum:{$cond:{
							{$eq:['tie','$resultInformation.winner']},
							1,	//True case
							0	//False case
						}}}
					},
					rankingPoints:{$sum:{$cond:{	//CHECK IF THIS IS TOTAL SCORE OR FINAL SCORE!
						{$eq:['red','$resultInformation.winner']},	//This is unbias
						'$resultInformation.score.total.blue',	//True case; If red wins then take blue total score
						'$resultInformation.score.total.red'	//False case; If red loses then take red total score; or if tie then take red score
					}}}
				}}
			],
			blue:[
				{$project:{
					teams:['$_id.matchInformation.teams.blue1','$_id.matchInformation.teams.blue2'],
					score:'$resultInformation.score'
				}},
				{$unwind:'teams'},
				{$group:{
					_id:'$teams',
					record:{
						wins:{$sum:{$cond:{
							{$eq:['blue','$resultInformation.winner']},
							1,	//True case
							0	//False case
						}}},
						losses:{$sum:{$cond:{
							{$eq:['red','$resultInformation.winner']},	//Since this is focusing on the red teams
							1,	//True case
							0	//False case
						}}},
						ties:{$sum:{$cond:{
							{$eq:['tie','$resultInformation.winner']},
							1,	//True case
							0	//False case
						}}}
					},
					rankingPoints:{$sum:{$cond:{	//CHECK IF THIS IS TOTAL SCORE OR FINAL SCORE!
						{$eq:['red','$resultInformation.winner']},	//This is unbias
						'$resultInformation.score.total.blue',	//True case; If red wins then take blue total score
						'$resultInformation.score.total.red'	//False case; If red loses then take red total score; or if tie then take red score
					}}}
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
			]}	//Ties represent 1 point while wins represent 2 points
			rankingPoints:{$sum:'$rankingPoints'}
		}}
		{$sort:{
			qualifyingPoints: 1,	//Sorting by QP then RP
			rankingPoints: 1
		}}
	],function(err,oranges){
		console.log('Operation orangePickerRanking time(Milliseconds):',new Date(new Date()-pickerTimer).getMilliseconds())
		console.log('[DONE]-orangePickerRanking')
		db.close()	//We don't need the database anymore
		if(err){
			console.log(err)
		}else{
			oranges(oranges)	//Thses oranges don't need peeling;	this is the call back.
		}
	})
}

function orangePickerMatchHistory(orchard, oranges){

}

module.exports = {
	orangePickerRanking: orangePickerRanking,
	orangePickerMatchHistory: orangePickerMatchHistory
}
// To use in another file:
// var orangePicker = require('./orangePicker')
// orangePicker.orangePickerRanking(orchard, oranges)
// Where oranges is the callback function returning a json