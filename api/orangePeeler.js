//API orangePeeler by Michael Leonffu
var MongoClient = require('mongodb').MongoClient
//var configDB = require('./../config/database.js')
//ObjectId = require('mongodb').ObjectID

var juicyCalculator = require('./juicyCalculator')

//orangePeeler can be best described by a metafore..
//juicyCalculator processess oranges into juicyData
//orangePeeler males sure to clean and sort the differnt 
//oranges before processing them into juicyData in order to achive best quality juicyData

function teamInfluencePeeler(scheduleCollection, matchDataCollection){
	//This make sure to find the oranges that are important for calculating OPR; schedule and matchdata
	console.log('[START]-teamInfluencePeeler')
	MongoClient.connect('mongodb://localhost/TheOrangeAllianceTest', function(err,db){
		//If there is an error while connecting to the database
		if(err){
			console.log(err)
			return
		}

		//Make the schedule and matchData.....
		db.collection(scheduleCollection).aggregate([
			{$unwind:'$schedule'},
			{$lookup:{
				from:matchDataCollection,
				localField:'schedule.match',
				foreignField:'matchInformation.matchNumber',
				as:'matchData'
			}},
			//{$unwind:'$matchData'}, //Maybe Uncomment
			{$project:{
				_id:0,
				teamsScore:[
					{
						//teams:['$schedule.teams.red1','$schedule.teams.red2'],
						team1:'$schedule.teams.red1',
						team2:'$schedule.teams.red2',
						score:'$matchData.resultsInformation.score.total.red'
					},
					{
						//teams:['$schedule.teams.blue1','$schedule.teams.blue2'],
						team1:'$schedule.teams.blue1',
						team2:'$schedule.teams.blue2',
						score:'$matchData.resultsInformation.score.total.blue'
					}
				]
			}},
			{$unwind:'$teamsScore'},
			{$facet:{
				teamsScore:[
					{$project:{
						//teams:'$teamsScore.teams',
						teams:['$teamsScore.team1','$teamsScore.team2'],
						score:'$teamsScore.score'
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
		// 		}
		// 	],
		// 	teamList:[123,123,123,] Team numbers unique list
		// }


		//Callback; the function that runs after the dataase gives a responce
		function teamsScores(err, docs){
			if(err){
				console.log(err)
				db.close()
			}else if(!(0 in docs)){
				console.log('Failed to get docs')
				db.close()
			}else{
				var doc = docs[0] //There should be one doc in docs
				//If threre are no errors then:
				var peeledOrange = {
					labels: doc.teamsList.sort(),
					juice: [],
					result: []
				}

				var peelerTimer = new Date()

				for (var i = doc.teamsScore.length - 1; i >= 0; i--) {
					peeledOrange.result.push(doc.teamsScore[i].score)
					peeledOrange.juice[i] = []
					for (var j = peeledOrange.labels.length - 1; j >= 0; j--) {
						peeledOrange.juice[i][j] = doc.teamsScore[i].teams[0] == peeledOrange.labels[j] || doc.teamsScore[i].teams[1] == peeledOrange.labels[j]?1:0
					}
				}
				peeledOrange.result.reverse() //It's backwards?

				// returns it as 
				// {
				// 	labels:[],
				// 	juice:[
				// 		[],
				// 		[]
				// 	],
				// 	result:[
				// 		[],
				// 		[]
				// 	]
				// }

				console.log('Operation teamInfluencePeeler time(Milliseconds):',new Date(new Date()-peelerTimer).getMilliseconds())
				console.log('[DONE]-teamInfluencePeeler')
				db.close()
				juicyCalculator(peeledOrange)
				return peeledOrange
			}
		}
	})
}


//teamInfluencePeeler('scheduleturing', 'matchDataturing')
teamInfluencePeeler('scheduleeuclid', 'matchDataeuclid')


// module.exports = function(app) {

// }