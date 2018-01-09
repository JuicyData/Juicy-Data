//simulation by Michael Leonffu

// Verson 1 
// 	Started around December 2017? and ends around January 5th 2018

// This verson calculates the algorithms modeling rate rather than it's prediction rate.
// It simulates the data that would come though as if it was in an event.
// 	It'll loop a data set of an event and give the algorithm all the matches 0 to x,
// 	where x incerments thoughout the simulator (as if it was an acual event and x is the matches recored).

// 	The algorithm then must predict all the matches that are given.
// 		for instance if 5 matches are given then it'll predict all 5 matches.
// 		The rate/precent generated is from how accuerate it was in "predicting" those 5 matches.

// The problem with this approach is that it's not getting prediction rate, rather it's in a way getting modleing rate.
// 	To get prediction rate the algorithem will be given x matches and predict the next match,
// 	all its predictsion would be added up and a prediction rate would be generated.

// The reason it's modleing rate is because,
// 	it uses its current data to see how accuerate the algoritehm would produce the same results.

// 	Since it is given x matches and is told to report what it would think of the x matches.
// 	the results generated would be how accuerate it can alighn it's algorithm to x matches

// The Acceratey rate is useful in a way.
// 	It's not the end goal but it dose have another way to validate how well a algoryem should predict
// 	If it can model the data then it should be able to predict it similarly as well.
// 		The only concern is that it does have all of its data in order to do acceracy.
// 		That means that it predicts x matches with x matches amount of data, which is almost selffullfilling prophicy.
// 		>>BUT there are statisical ways to valiadate such data..... (further on this latter)

// Another concern with this approach is the way the data is weighed. [investigate this]
// 	For instance, with more data, when x is a greater number,
// 	the acceracy my be greater or less than when x is a lesser number.
// 	maybe the total accerate rate should have weights on the amount of matches.
// 		this would mean that the greater x is, that modeling accercary would have a greater impact on the overal modleing rate score.
// 		this may be statiscally helpful or hurtful (need to check this latter)

// As for the script it self
// 	Verson 1 includes OPR CCWM and random algorithms:
// 		OPR cacluates the OPR of the data set
// 		to predict, it addes the allianaces OPR and compares it to the other team.
// 		which ever has a grater combined OPR is predicted as the winner

// 		CCWM is similar as OPR expect it uses CCWM.
// 		the difference is that CCWM is not only OFFENISVE POWER but also DEFFENSIVE

// 		random uses a random number generate and has about a 50% chance to predict true or false.

// 	Verson 1 uses two data sets from two events which are hard coded into the script.

// 	Verson 1 has a simulation method and a results anaylissi method
// 		but the results analysis method isn't in any feed back loop or do any complicated analysis

// Some goals for verson 2
// 	Add some new algoritysm, maybe some META data algorityms
// 		Maybe add DPR from OPR and CCWM?
// 		Maybe make a method  that uses element data???
// 	Add database interfaceing for data inserting and/or reporting
// 	Add acual statiscal anyalisis from anaylissi method
// 	Add stats method, method library ffor stats used for META algoritms and analysis
// 	Maybe make a nerual network :>
// 		Maybe add some algoriyms to it in order to bost it's data input :>
// 	Maybe seperate methods into several files to reduce this file length
// 	Maybe make a data cleaner, in order to clean the database of all its data
// 	Maybe (NOT ANY TIME SOON) allow algoriythms to pull data from all events per team in order to predict.
// 	Maybe add more data (element data) rather than just wins/lossess
// 	Add (as a compromise to above) score totals from the differnt periods (auto driver end)
// 	Fix/Change algoriym data insert so that algoyithms can pick and chose which data they want to listen to
// 		So if they want to use both element and reults data they can use, but if they only want results thats cool too
// 	Change/fix the "prediction rate" to be "modleing rate"
// 	Add/Fix make an acual "prediction rate"

var math = require('mathjs')
var juicyCalculator = require('./../juicyCalculator')
// var MongoClient = require('mongodb').MongoClient
// var configDB = require('./../config/database.js')
// ObjectId = require('mongodb').ObjectID
const util = require('util')

var algorithmLoader = function(algorithmName, data){
	if(algorithmName === 'OPR'){
		return algorithms.OPR(data)
	}
	if(algorithmName === 'CCWM'){
		return algorithms.CCWM(data)
	}
	if(algorithmName === 'random'){
		return algorithms.random(data)
	}
	return -1
}

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

var dataSamples = [
	{
		sampleName: 'League Meet Descartus? (December 9)',
		sampleData: [
			[1,11285,5131,10793,4262,30,161,30,161],
			[2,12765,3848,10092,9266,175,50,175,50],
			[3,11350,10390,8097,10809,58,34,58,34],
			[4,5135,9261,11656,10793,81,125,81,125],
			[5,10809,12765,3848,5131,142,4,142,4],
			[6,11656,9261,9266,10390,147,64,147,64],
			[7,4262,8097,5135,10092,171,40,171,40],
			[8,11350,12765,11285,9261,216,71,216,71],
			[9,8097,9266,10793,10809,79,30,79,30],
			[10,11285,10390,10092,5131,32,4,32,4],
			[11,4262,11656,11350,3848,103,217,103,217],
			[12,5135,10793,12765,10390,40,72,40,72],
			[13,10092,4262,10809,9261,150,135,150,135],
			[14,3848,11656,8097,11285,131,54,131,54],
			[15,5135,9266,11350,5131,115,89,115,89],
			[16,8097,10390,4262,12765,24,244,24,244],
			[17,10793,10092,11350,11285,0,99,0,99],
			[18,10809,9266,5135,11285,106,74,106,74],
			[19,9261,5131,3848,8097,73,112,73,112]
		]
	},
	{
		sampleName: '1718 NCAL RWC',
		sampleData: [
			[1,13215,13219,9914,7390,34,165,000,000],
			[2,13218,11689,5214,13216,18,47,000,000],
			[3,9784,13162,6165,13219,162,123,000,000],
			[4,7390,5214,9784,13216,223,177,000,000],
			[5,13162,11689,9914,13218,22,167,000,000],
			[6,6165,11689,13215,7390,116,141,000,000],
			[7,13216,13215,13162,13219,60,81,000,000],
			[8,9914,6165,13218,5214,240,32,000,000],
			[9,9784,7390,13162,9914,298,89,000,000],
			[10,11689,5214,13219,9784,47,161,000,000],
			[11,13218,13216,13215,6165,54,118,000,000],
			[12,13218,13215,9784,5214,26,224,000,000],
			[13,13162,6165,11689,13219,175,91,000,000],
			[14,9914,13216,7390,11689,131,109,000,000],
			[15,9914,9784,13216,6165,256,151,000,000],
			[16,13215,5214,13162,7390,173,266,000,000],
			[17,13219,7390,13218,9784,213,125,000,000]
		]
	}
]

var localDataFormat = function(rawData){
	var localDataFormated = []
	for (var i = 0; i < rawData.length; i++) {
		localDataFormated[i] = {
			matchNumber: rawData[i][0],
			teams: {
				red1: rawData[i][1],
				red2: rawData[i][2],
				blue1: rawData[i][3],
				blue2: rawData[i][4]
			},
			score: {
				total:{
					red: rawData[i][5],
					blue: rawData[i][6]
				},
				final: {
					red: rawData[i][7],
					blue: rawData[i][8]
				}
			}
		}
	}
	return localDataFormated
}

var foreignDataFormat = function(rawData){
	//using the matchData schema (subject to change)
	var foreignDataFormated = []
	for (var i = 0; i < rawData.length; i++) {
		foreignDataFormated[i] = [
			rawData[i]._id.matchInformation.matchNumber,
			rawData[i]._id.matchInformation.teams.red1,
			rawData[i]._id.matchInformation.teams.red2,
			rawData[i]._id.matchInformation.teams.blue1,
			rawData[i]._id.matchInformation.teams.blue2,
			rawData[i].resultsInformation.score.total.red,
			rawData[i].resultsInformation.score.total.blue,
			rawData[i].resultsInformation.score.final.red,
			rawData[i].resultsInformation.score.final.blue
		]
	}
	return foreignDataFormated
}

var algorithmHelpers = {
	generateUniqueList: function(localData){

		// localData = [
		// 	{
		// 		teams:{
		// 			red1: 123,
		// 			red2: 123,
		// 			blue1: 123,
		// 			blue2: 123
		// 		}
		// 	}
		// ]

		var uniqueList = []
		for (var i = 0; i < localData.length; i++) {
			if(-1 == uniqueList.indexOf(String(localData[i].teams.red1))){
				uniqueList.push(String(localData[i].teams.red1))
			}
			if(-1 == uniqueList.indexOf(String(localData[i].teams.red2))){
				uniqueList.push(String(localData[i].teams.red2))
			}
			if(-1 == uniqueList.indexOf(String(localData[i].teams.blue1))){
				uniqueList.push(String(localData[i].teams.blue1))
			}
			if(-1 == uniqueList.indexOf(String(localData[i].teams.blue2))){
				uniqueList.push(String(localData[i].teams.blue2))
			}
		}
		return uniqueList
	}

}

var algorithms = {

	template: function(localData){
		localData = localDataFormat(localData)

		//Data comes in this form I think.
		// localData = [
		// 	{
		// 		matchNumber: rawData[i][0],
		// 		teams: {
		// 			red1: rawData[i][1],
		// 			red2: rawData[i][2],
		// 			blue1: rawData[i][3],
		// 			blue2: rawData[i][4]
		// 		},
		// 		score: {
		// 			total:{
		// 				red: rawData[i][5],
		// 				blue: rawData[i][6]
		// 			},
		// 			final: {
		// 				red: rawData[i][7],
		// 				blue: rawData[i][8]
		// 			}
		// 		}
		// 	}
		// ]

		var results = []

		// results must be in this form to be exported into analyzizer
		// result: [
		// //Match# 	Actual		//predicted		//Certainty (0-100%); -1 if there is no certainty value)
		// 	[123,		'red blue',		'red blue',			.123]
		// ]

		//Generalized prediction forloop model
		for (var i = 0; i < localData.length; i++) {
			//Runs through every match IN THE DATA SET CURRENTLY allowing you do run your prediction algorithmsn
			//localData[i] is a match (shown above)
			results[i] = [
				//Match Number; Acual score; PREDICTION; certiantiny (or any number 0-100)
				localData[i].matchNumber, //Shouldnt change
				localData[i].score.total.red == localData[i].score.total.blue ? 'tie' : localData[i].score.total.red < localData[i].score.total.blue ? 'blue' : 'red', //Shouldnt change
				math.round(math.random()*100) < 50 ? 'red' : 'blue',	//YOU CAHNGE THIS; This is your prediction of your match; either 'tie', 'red', or 'blue'
				-1	//YOU CHANGE THIS: THIS IS YOUR CERTAINTY (or any number between 0-100 about how you feel of this prediction of this match)
			]
		}

		return results
	},

	OPR: function(localData){
		localData = localDataFormat(localData)

		orange = {
			labels: [],
			juice: [],
			result: []
		}

		orange.labels = algorithmHelpers.generateUniqueList(localData)

		//For red
		for (var i = 0; i < localData.length; i++) {
			//localData[i]
			orange.juice[i] = []
			for (var j = 0; j < orange.labels.length; j++) {
				if(orange.labels[j] == String(localData[i].teams.red1)){
					orange.juice[i][j] = 1
				}else{
					if(orange.labels[j] == String(localData[i].teams.red2)){
						orange.juice[i][j] = 1
					}else{
						orange.juice[i][j] = 0
					}
				}
			}
			orange.result[i] = [localData[i].score.total.red]
		}

		//For blue
		for (var i = 0; i < localData.length; i++) {
			var orangeJuiceLength = orange.juice.length 	//have to do this for some reason
			orange.juice[orangeJuiceLength] = []
			for (var j = 0; j < orange.labels.length; j++) {
				if(orange.labels[j] == String(localData[i].teams.blue1)){
					orange.juice[orangeJuiceLength][j] = 1
				}else{
					if(orange.labels[j] == String(localData[i].teams.blue2)){
						orange.juice[orangeJuiceLength][j] = 1
					}else{
						orange.juice[orangeJuiceLength][j] = 0
					}
				}
			}
			orange.result[orangeJuiceLength] = [localData[i].score.total.blue]
		}

		var juicyOPR = juicyCalculator(orange)

		if(juicyOPR == -1){
			return -1
		}

		var results = []

		var maxCombineOPR = 0

		//Predictions
		for (var i = 0; i < localData.length; i++) {
			results[i] = [
				localData[i].matchNumber, 
				localData[i].score.total.red == localData[i].score.total.blue ? 'tie' : localData[i].score.total.red < localData[i].score.total.blue ? 'blue' : 'red',
				juicyOPR.juice[String(localData[i].teams.red1)] + juicyOPR.juice[String(localData[i].teams.red2)] == juicyOPR.juice[String(localData[i].teams.blue1)] + juicyOPR.juice[String(localData[i].teams.blue2)] ? 'tie' : juicyOPR.juice[String(localData[i].teams.red1)] + juicyOPR.juice[String(localData[i].teams.red2)] < juicyOPR.juice[String(localData[i].teams.blue1)] + juicyOPR.juice[String(localData[i].teams.blue2)] ? 'blue' : 'red'
			]
			if(math.abs(juicyOPR.juice[String(localData[i].teams.red1)] + juicyOPR.juice[String(localData[i].teams.red2)] - juicyOPR.juice[String(localData[i].teams.blue1)] - juicyOPR.juice[String(localData[i].teams.blue2)])  > maxCombineOPR){
				maxCombineOPR = math.abs(juicyOPR.juice[String(localData[i].teams.red1)] + juicyOPR.juice[String(localData[i].teams.red2)] - juicyOPR.juice[String(localData[i].teams.blue1)] - juicyOPR.juice[String(localData[i].teams.blue2)])
			}
		}

		for (var i = 0; i < localData.length; i++) {
			results[i][3] = math.round(100*(math.abs(juicyOPR.juice[String(localData[i].teams.red1)] + juicyOPR.juice[String(localData[i].teams.red2)] - juicyOPR.juice[String(localData[i].teams.blue1)] - juicyOPR.juice[String(localData[i].teams.blue2)])/maxCombineOPR), 3)
		}

		return results
	},

	CCWM: function(localData){
		localData = localDataFormat(localData)

		orange = {
			labels: [],
			juice: [],
			result: []
		}

		orange.labels = algorithmHelpers.generateUniqueList(localData)

		//For red
		for (var i = 0; i < localData.length; i++) {
			//localData[i]
			orange.juice[i] = []
			for (var j = 0; j < orange.labels.length; j++) {
				if(orange.labels[j] == String(localData[i].teams.red1)){
					orange.juice[i][j] = 1
				}else{
					if(orange.labels[j] == String(localData[i].teams.red2)){
						orange.juice[i][j] = 1
					}else{
						orange.juice[i][j] = 0
					}
				}
			}
			orange.result[i] = [localData[i].score.total.red - localData[i].score.total.blue]
		}

		//For blue
		for (var i = 0; i < localData.length; i++) {
			var orangeJuiceLength = orange.juice.length
			orange.juice[orangeJuiceLength] = []
			for (var j = 0; j < orange.labels.length; j++) {
				if(orange.labels[j] == String(localData[i].teams.blue1)){
					orange.juice[orangeJuiceLength][j] = 1
				}else{
					if(orange.labels[j] == String(localData[i].teams.blue2)){
						orange.juice[orangeJuiceLength][j] = 1
					}else{
						orange.juice[orangeJuiceLength][j] = 0
					}
				}
			}
			orange.result[orangeJuiceLength] = [localData[i].score.total.blue - localData[i].score.total.red]
		}

		var juicyOPR = juicyCalculator(orange)

		if(juicyOPR == -1){
			return -1
		}

		var results = []

		var maxCombineOPR = 0

		//Predictions
		for (var i = 0; i < localData.length; i++) {
			results[i] = [
				localData[i].matchNumber, 
				localData[i].score.total.red == localData[i].score.total.blue ? 'tie' : localData[i].score.total.red < localData[i].score.total.blue ? 'blue' : 'red',
				juicyOPR.juice[String(localData[i].teams.red1)] + juicyOPR.juice[String(localData[i].teams.red2)] == juicyOPR.juice[String(localData[i].teams.blue1)] + juicyOPR.juice[String(localData[i].teams.blue2)] ? 'tie' : juicyOPR.juice[String(localData[i].teams.red1)] + juicyOPR.juice[String(localData[i].teams.red2)] < juicyOPR.juice[String(localData[i].teams.blue1)] + juicyOPR.juice[String(localData[i].teams.blue2)] ? 'blue' : 'red'
			]
			if(math.abs(juicyOPR.juice[String(localData[i].teams.red1)] + juicyOPR.juice[String(localData[i].teams.red2)] - juicyOPR.juice[String(localData[i].teams.blue1)] - juicyOPR.juice[String(localData[i].teams.blue2)])  > maxCombineOPR){
				maxCombineOPR = math.abs(juicyOPR.juice[String(localData[i].teams.red1)] + juicyOPR.juice[String(localData[i].teams.red2)] - juicyOPR.juice[String(localData[i].teams.blue1)] - juicyOPR.juice[String(localData[i].teams.blue2)])
			}
		}

		for (var i = 0; i < localData.length; i++) {
			results[i][3] = math.round(100*(math.abs(juicyOPR.juice[String(localData[i].teams.red1)] + juicyOPR.juice[String(localData[i].teams.red2)] - juicyOPR.juice[String(localData[i].teams.blue1)] - juicyOPR.juice[String(localData[i].teams.blue2)])/maxCombineOPR), 3)
		}

		return results
	},

	random: function(localData){
		localData = localDataFormat(localData)

		var results = []

		//Prediction
		for (var i = 0; i < localData.length; i++) {
			results[i] = [
				localData[i].matchNumber, 
				localData[i].score.total.red == localData[i].score.total.blue ? 'tie' : localData[i].score.total.red < localData[i].score.total.blue ? 'blue' : 'red',
				math.round(math.random()*100) < 50 ? 'red' : 'blue',
				-1
			]
		}

		return results
	}
}



//console.log(analyze(simulator(['algorithmOPR'],dataSamples)[0].results[0]))

console.log(analyze(simulator(['OPR','CCWM','random'],dataSamples)))

//console.log(util.inspect(analyze(simulator(['OPR','CCWM','random'],dataSamples)),{showHidden: false, depth: null}))

module.exports = {
	analyze: analyze,
	simulator: simulator
}



