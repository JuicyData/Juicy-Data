//orangePeeler by Michael Leonffu
var MongoClient = require('mongodb').MongoClient
//var configDB = require('./../config/database.js')
//ObjectId = require('mongodb').ObjectID

//var juicyCalculator = require('./juicyCalculator')

//orangePeeler can be best described by a metafore..
//juicyCalculator processess oranges into juicyData
//orangePeeler males sure to clean and sort the differnt 
//oranges before processing them into juicyData in order to achive best quality juicyData

function teamInfluencePeeler(pickedOranges, peeledOranges){
	//This make sure to find the oranges that are important for calculating OPR; schedule and matchdata
	console.log('[START]-teamInfluencePeeler')

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
			peeledOranges(peeledOrange)
		}
	}
}

module.exports = teamInfluencePeeler

// To use in another file:
// var orangePeeler = require('./orangePeeler')
// orangePeeler(pickedOranges, peeledOranges)
// Where peeledOranges is the callback function returning a json