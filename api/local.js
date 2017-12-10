//local by Michael Leonffu
var math = require('mathjs')
var juicyCalculator = require('./juicyCalculator')
// var MongoClient = require('mongodb').MongoClient
// var configDB = require('./../config/database.js')
// ObjectId = require('mongodb').ObjectID

var orchard = {
	name: 'Baka',
	date: 'Baka',
	locationID: 'BakaId'
}
var rawData = [
	//Match Number,	Red1,	Red2,	Blue1,	Blue2,	RedScoreTotal,	BlueScoreTotal, RedScoreFinal,	BlueScoreFinal	
	//[		0,		00001,	00002,	00003,	00004,		005,			006,			007,			008		],
	// [		1,		00000,	00000,	00000,	00000,		000,			000,			000,			000		]
	// [		2,		13218,	11689,	5214,	13216,		18,				47,				000,			000		],
	// [		3,		9784,	13162,	6165,	13219,		162,			123,			000,			000		],
	// [		4,		7390,	5214,	9784,	13216,		223,			177,			000,			000		],
	// [		5,		13162,	11689,	9914,	13218,		22,				167,			000,			000		],
	// [		6,		6165,	11689,	13215,	7390,		116,			141,			000,			000		],
	// [		7,		13216,	13215,	13162,	13219,		60,				81,				000,			000		],
	// [		8,		9914,	6165,	13218,	5214,		240,			32,				000,			000		],
	// [		9,		9784,	7390,	13162,	9914,		298,			89,				000,			000		],
	// [		10,		11689,	5214,	13219,	9784,		47,				161,			000,			000		],
	// [		11,		13218,	13216,	13215,	6165,		54,				118,			000,			000		],
	// [		12,		13218,	13215,	9784,	5214,		26,				224,			000,			000		],
	// [		13,		13162,	6165,	11689,	13219,		175,			91,				000,			000		],
	// [		14,		9914,	13216,	7390,	11689,		131,			109,			000,			000		],
	// [		15,		9914,	9784,	13216,	6165,		256,			151,			000,			000		],
	// [		16,		13215,	5214,	13162,	7390,		173,			266,			000,			000		],
	// [		17,		13219,	7390,	13218,	9784,		213,			125,			000,			000		]
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
	[19,9261,5131,3848,8097,73,112,73,112],
]

// var makeSchedule = function(rawData, orchard){
// 	var schedule = {
// 		_id:{
// 			eventInformation: orchard
// 		},
// 		schedule: []
// 	}

// 	for (var i = 0; i < rawData.length; i++) {
// 		schedule.schedule[i] = {
// 			matchNumber: rawData[i][0],
// 			teams: {
// 				red1: rawData[i][1],
// 				red2: rawData[i][2],
// 				blue1: rawData[i][3],
// 				blue2: rawData[i][4]
// 			}
// 		}
// 	}

// 	return schedule
// }

// console.log(makeSchedule(rawData))

var makeMatchData = function(rawData, orchard){
	var matchData = []

	for (var i = 0; i < rawData.length; i++) {
		matchData[i] = {
			_id:{
				eventInformation: orchard,
				matchInformation:{
					matchNumber: rawData[i][0],
					teams: {
						red1: rawData[i][1],
						red2: rawData[i][2],
						blue1: rawData[i][3],
						blue2: rawData[i][4]
					}
				}
			},
			resultInformation: {
				winner: rawData[i][7] == rawData[i][8] ? 'tie' : rawData[i][7] > rawData[i][8] ? 'red' : 'blue',
				score:{
					total:{
						red: rawData[i][5],
						blue: rawData[i][6]
					},
					final:{
						red: rawData[i][7],
						blue: rawData[i][8]
					}
				}
			}
		}
	}
	return matchData
}

//console.log(makeMatchData(rawData,orchard))

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

// var localData = [
	// {
	// 	matchNumber: 123,
	// 	teams: {
	// 		red1: 123,
	// 		red2: 123,
	// 		blue1: 123,
	// 		blue2: 123
	// 	},
	// 	score: {
	// 		total:{
	// 			red: 123,
	// 			blue: 123
	// 		},
	// 		final: {
	// 			red: 123,
	// 			blue: 123
	// 		}
	// 	}
	// }
// ]

var localMain = function(localData){

	orange = {
		labels: [],
		juice: [],
		result: []
	}

	//Get unique list of teams:
	for (var i = 0; i < localData.length; i++) {
		if(-1 == orange.labels.indexOf(String(localData[i].teams.red1))){
			orange.labels.push(String(localData[i].teams.red1))
		}
		if(-1 == orange.labels.indexOf(String(localData[i].teams.red2))){
			orange.labels.push(String(localData[i].teams.red2))
		}
		if(-1 == orange.labels.indexOf(String(localData[i].teams.blue1))){
			orange.labels.push(String(localData[i].teams.blue1))
		}
		if(-1 == orange.labels.indexOf(String(localData[i].teams.blue2))){
			orange.labels.push(String(localData[i].teams.blue2))
		}
	}

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
		orange.result[orangeJuiceLength] = [localData[i].score.total.blue]
	}
	return orange
}

var localMainCCWM = function(localData){

	orange = {
		labels: [],
		juice: [],
		result: []
	}

	//Get unique list of teams:
	for (var i = 0; i < localData.length; i++) {
		if(-1 == orange.labels.indexOf(String(localData[i].teams.red1))){
			orange.labels.push(String(localData[i].teams.red1))
		}
		if(-1 == orange.labels.indexOf(String(localData[i].teams.red2))){
			orange.labels.push(String(localData[i].teams.red2))
		}
		if(-1 == orange.labels.indexOf(String(localData[i].teams.blue1))){
			orange.labels.push(String(localData[i].teams.blue1))
		}
		if(-1 == orange.labels.indexOf(String(localData[i].teams.blue2))){
			orange.labels.push(String(localData[i].teams.blue2))
		}
	}

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
	return orange
}

var printing = function(orange, juice){
	console.log('Together')
	for (var i = 0; i < orange.labels.length; i++) {
		//Team Number then OPR
		console.log(orange.labels[i], '!', juice.juice[String(orange.labels[i])])
	}
	console.log('Teams')
	for (var i = 0; i < orange.labels.length; i++) {
		console.log(orange.labels[i])
	}
	console.log('OPR')
	for (var i = 0; i < orange.labels.length; i++) {
		console.log(juice.juice[String(orange.labels[i])])
	}
}

console.log('Unique Team List', localMain(localDataFormat(rawData)).labels)

juicyCalculator(localMain(localDataFormat(rawData)), function(calculatedJuice){
	console.log('calculatedJuice', calculatedJuice)
	try{
		printing(localMain(localDataFormat(rawData)), calculatedJuice)
	}catch(err){
		console.log('Cant')
	}
})

juicyCalculator(localMainCCWM(localDataFormat(rawData)), function(calculatedJuice){
	console.log('calculatedJuice', calculatedJuice)
	try{
		printing(localMainCCWM(localDataFormat(rawData)), calculatedJuice)
	}catch(err){
		console.log('Cant')
	}
})

// var localUpload = function(data){
// 	MongoClient.connect(configDB.url, function(err,db){
// 		//If there is an error while connecting to the database
// 		if(err){
// 			console.log(err)
// 			return
// 		}



// 		// db.collection('schedule').insert({

// 		// })

// 		db.close()		

// 	})
// }

// Determines the values of jello
// orange should be in the form of:
// orange: {
// 	labels:['123','123',...],	labels numbers in same order as matches
// 	juice:[						this is the collum(row index), index 0 is match 1...
// 		[1,0,0,1,0,1,0,...]...	this is the row(row contents), is 1 if the team played in match, 0 if the team does not play
// 	],							should have as many rows as matches and collumns as teams to make a RECTANGLUAR matrix
// 	result:[					this should be a (amount of matches) x 1 size matrix
// 		[123]					this is the combined score of the teams that played in that match
// 	]
// }
