//simulation by Michael Leonffu
var math = require('mathjs')
var algorithms = require('./../algorithms/algorithms')
var MongoClient = require('mongodb').MongoClient
var configDB = require('./../../config/database.js')
ObjectId = require('mongodb').ObjectID
const util = require('util')

var simulator = function(algorithms, dataSamples){
	//Simulates a Competeion data using one data set at a time; runs as many dataSamples; runs many algorithms

	// algorithms = ['Name of algorithm'] Example of algorithms input

	// dataSamples = [
	// 	{
	// 		sampleName: 'abc',	//Name of sample
	// 		sampleData: [
	// 		//Match #	Red1	Red2	Blue1	Blue2	TotalRed TotalBlue Final Red Final Blue
	// 			[123,	123,	123,	123,	123,	123,		123,		123,	123],
	// 		]
	// 	}
	// ]

	// simulatorResults = [
	// 	{
	// 		algorithmName: 'abc',
	// 		results: [
	// 			{
	// 				sampleName: 'abc',
	// 				results: [
	// 					{
	// 						resultSet: 123, //Which result it us (how many matches are in it)
	// 						result: [
	// 						//Match# 	Actual		//predicted		//Certainty (0-100%); -1 if there is no certainty value)
	// 							[123,		'red blue',		'red blue',			.123]
	// 						]
	// 					}
	// 				]
	// 			}
	// 		]
	// 	}
	// ]

	var simulatorResults = []

	for (var i = 0; i < algorithms.length; i++) {	//goes though the differnt algorithms
		var results = []
		for (var j = 0; j < dataSamples.length; j++) {	//does though the dataSamples
			var result = []
			var loadedData = []
			for (var k = 0; k < dataSamples[j].sampleData.length; k++) {	//Goes though the sampleData 
				loadedData.push(dataSamples[j].sampleData[k])
				//console.log(k,loadedData)
				result[k] = {
					resultSet: k,
					result: algorithmLoader(algorithms[i],loadedData)
				}
				//dataSamples[j].sampleData[k]
			}
			results[j] = {
				sampleName: dataSamples[j].sampleName,
				results: result
			}
		}
		//algorithms[i]
		simulatorResults[i] = {
			algorithmName: algorithms[i],
			results: results
		}
	}
	return simulatorResults
}

var analyze = function(simulatorResults){
	//Analysis on the simulaorResults; returns the analysisResults

	// analysisResults = [
	// 	{
	// 		algorithmName: 'abc',
	// 		results: {
	// 			algorithmPredictionRate: .123, //0-100%
	// 			//earlyiestPredictionsAndTheirAccueracy
	// 			rawResults: [
	// 				{
	// 					sampleName: 'abc',
	// 					samplePredictionRate: .123, //0 - 100%
	// 					results: [
	// 						{
	// 							resultSet: 123,
	// 							predictionRate: .123, //0 - 100%
	// 							result: [
	// 							//Match# 	Actual		//predicted		//Certainty (0-100%); -1 if there is no certainty value)
	// 								[123,		'red blue',		'red blue',			.123]
	// 							]
	// 						}
	// 					]
	// 				}
	// 			]
	// 		}
	// 	}
	// ]

	analysisResults = []

	for (var i = 0; i < simulatorResults.length; i++) {	//chose algorithym
		//simulatorResults[i]

		var rawResults = []
		var algorithmPredictionRateSum = 0

		for (var j = 0; j < simulatorResults[i].results.length; j++) {	//choose results (which sample data)
			//simulatorResults[i].results[j]

			var predictedValuesOfSet = []
			var predictedValueOfSetTotal = 0
			var maxFailPredict = 0
			var failPredictCount = 0

			for (var k = 0; k < simulatorResults[i].results[j].results.length; k++) {	//choose result set (max match)
				//simulatorResults[i].results[j].results[k]

				var totalCorrectCount = 0

				for (var l = 0; l < simulatorResults[i].results[j].results[k].result.length; l++) {
					if(simulatorResults[i].results[j].results[k].result[l][1] == simulatorResults[i].results[j].results[k].result[l][2]){
						totalCorrectCount++
					}
					//simulatorResults[i].results[j].results[k].result[l]
				}

				predictedValuesOfSet[k] = {
					resultSet: simulatorResults[i].results[j].results[k].resultSet,
					predictionRate: math.round(100* totalCorrectCount/simulatorResults[i].results[j].results[k].result.length ? 100* totalCorrectCount/simulatorResults[i].results[j].results[k].result.length : -1, 3),
					result: simulatorResults[i].results[j].results[k].result
				}

				if(simulatorResults[i].results[j].results[k].result != -1){
					predictedValueOfSetTotal += 100* totalCorrectCount/simulatorResults[i].results[j].results[k].result.length
				}else{
					failPredictCount++
					if(maxFailPredict < failPredictCount){
						maxFailPredict = failPredictCount
						//HERE 
					}
				}

			}

			rawResults[j] = {
				sampleName: simulatorResults[i].results[j].sampleName,
				samplePredictionRate: math.round(predictedValueOfSetTotal/(simulatorResults[i].results[j].results.length - maxFailPredict), 3),
				results: predictedValuesOfSet
			}

			algorithmPredictionRateSum += math.round(predictedValueOfSetTotal/(simulatorResults[i].results[j].results.length - maxFailPredict), 3)
		}

		analysisResults[i] = {
			algorithmName: simulatorResults[i].algorithmName,
			results: {
				algorithmPredictionRate: math.round(algorithmPredictionRateSum/simulatorResults[i].results.length, 3),
				rawResults: rawResults
			}
		}
	}

	return analysisResults
}

// var stats = {
// 	mean: function(data){
// 		var meanValue = 0
// 		return meanValue
// 	},

// 	mode: function(data){
// 		var modeValue = 0
// 		return modeValue
// 	},

// 	median: function(data){
// 		var medianValue = 0
// 		return medianValue
// 	},

// 	max: function(data){
// 		var maxValue = 0
// 		return maxValue
// 	},

// 	min: function(data){
// 		var minValue = 0
// 		return minValue
// 	},

// 	stdev: function(data){
// 		var stdevValue = 0
// 		return stdevValue
// 	}
// }

//console.log(analyze(simulator(['algorithmOPR'],dataSamples)[0].results[0]))

//console.log(analyze(simulator(['OPR','CCWM','random', 'null'],dataSamples))[0].results)

//console.log(util.inspect(analyze(simulator(['OPR','CCWM','random'],dataSamples)),{showHidden: false, depth: null}))

module.exports = {
	analyze: analyze,
	simulator: simulator
}



