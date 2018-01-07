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

	var peeledOrangeBasket = []	//Contains all the peeled genericOrangeTemplate

	var orangeConversionFactor = [	//Helps convert oranges into generic form
		['offensiveOranges', 'total'],
		['marginalOranges', 'marginalScore']
	]

	var peelerTimer = new Date()

	for (var i = 0; i < orangeConversionFactor.length; i++) {
		//orangeConversionFactor[i]
		var tempOrange = {
			labels: pickedOrange.teamsList.sort(),
			juice: [],
			result: []
		}	//Get a fresh template
		for (var j = pickedOrange.teamsScore.length - 1; j >= 0; j--) {	//May be backwards bc of this
			tempOrange.result.push([pickedOrange.teamsScore[j]['score'][orangeConversionFactor[i][1]]])	//FIX LATTer
			tempOrange.juice[j] = []
			for (var k = tempOrange.labels.length - 1; k >= 0; k--) {
				tempOrange.juice[j][k] = pickedOrange.teamsScore[j].teams[0] == tempOrange.labels[k] || pickedOrange.teamsScore[j].teams[1] == tempOrange.labels[k]?1:0
			}
		}
		tempOrange.result.reverse() //It's backwards?
		tempOrange.dataLabel = orangeConversionFactor[i][0]
		peeledOrangeBasket[i] = tempOrange	//Put orange into the basket
	}

	console.log('Operation teamInfluencePeeler time(Milliseconds):',new Date(new Date()-peelerTimer).getMilliseconds())
	console.log('[DONE]-teamInfluencePeeler')
	peeledOranges(peeledOrangeBasket)

}

module.exports = {
	teamInfluencePeeler: teamInfluencePeeler
}

// To use in another file:
// var orangePeeler = require('./orangePeeler')
// orangePeeler(pickedOranges, peeledOranges)
// Where peeledOranges is the callback function returning a json