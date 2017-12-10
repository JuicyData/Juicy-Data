//orangePeeler by Michael Leonffu
//var MongoClient = require('mongodb').MongoClient
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
	// 			score:123, score these teams got
	// 			marginalScore:123 marginal score these teams got
	// 		}
	// 	],
	// 	teamList:[123,123,123,] Team numbers unique list
	// }

	var pickedOrange = pickedOranges[0]
	//If threre are no errors then:

	var peeledOffensiveOranges = {
		labels: pickedOrange.teamsList.sort(),
		juice: [],
		result: []
	}
	var peeledMarginalOranges = {
		labels: pickedOrange.teamsList.sort(),
		juice: [],
		result: []
	}

	var peelerTimer = new Date()

	for (var i = pickedOrange.teamsScore.length - 1; i >= 0; i--) {
		peeledOffensiveOranges.result.push([pickedOrange.teamsScore[i].score])
		peeledOffensiveOranges.juice[i] = []
		for (var j = peeledOffensiveOranges.labels.length - 1; j >= 0; j--) {
			peeledOffensiveOranges.juice[i][j] = pickedOrange.teamsScore[i].teams[0] == peeledOffensiveOranges.labels[j] || pickedOrange.teamsScore[i].teams[1] == peeledOffensiveOranges.labels[j]?1:0
		}
	}
	peeledOffensiveOranges.result.reverse() //It's backwards?

	for (var i = pickedOrange.teamsScore.length - 1; i >= 0; i--) {
		peeledMarginalOranges.result.push([pickedOrange.teamsScore[i].marginalScore])
		peeledMarginalOranges.juice[i] = []
		for (var j = peeledMarginalOranges.labels.length - 1; j >= 0; j--) {
			peeledMarginalOranges.juice[i][j] = pickedOrange.teamsScore[i].teams[0] == peeledMarginalOranges.labels[j] || pickedOrange.teamsScore[i].teams[1] == peeledMarginalOranges.labels[j]?1:0
		}
	}
	peeledMarginalOranges.result.reverse() //It's backwards?

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
	peeledOranges(peeledOffensiveOranges, peeledMarginalOranges)

}

var teamMarginalInfluencePeeler = function(pickedOranges, peeledOranges){
		//This make sure to find the oranges that are important for calculating OPR; schedule and matchdata
	console.log('[START]-teamMarginalInfluencePeeler')

	// {
	// 	teamsScore: [
	// 		{
	// 			teams:[123,123], Team numbers
	// 			marginalScore:123 marginal score these teams got
	// 		}
	// 	],
	// 	teamList:[123,123,123,] Team numbers unique list
	// }

	var pickedOrange = pickedOranges[0]
	//If threre are no errors then:
	var peeledOrange = {
		labels: pickedOrange.teamsList.sort(),
		juice: [],
		result: []
	}

	var peelerTimer = new Date()

	for (var i = pickedOrange.teamsScore.length - 1; i >= 0; i--) {
		peeledOrange.result.push([pickedOrange.teamsScore[i].marginalScore])
		peeledOrange.juice[i] = []
		for (var j = peeledOrange.labels.length - 1; j >= 0; j--) {
			peeledOrange.juice[i][j] = pickedOrange.teamsScore[i].teams[0] == peeledOrange.labels[j] || pickedOrange.teamsScore[i].teams[1] == peeledOrange.labels[j]?1:0
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

	console.log('Operation teamMarginalInfluencePeeler time(Milliseconds):',new Date(new Date()-peelerTimer).getMilliseconds())
	console.log('[DONE]-teamMarginalInfluencePeeler')
	peeledOranges(peeledOrange)
}

module.exports = {
	teamInfluencePeeler: teamInfluencePeeler
}

// To use in another file:
// var orangePeeler = require('./orangePeeler')
// orangePeeler(pickedOranges, peeledOranges)
// Where peeledOranges is the callback function returning a json