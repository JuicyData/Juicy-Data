//misc by Michael Leonffu

var math = require('mathjs')

var algorithms = {

	template: function(eventData, query){

		// Query is in form of:
		// query = {
		// 	alliance1: {
		// 		team1: 123,
		// 		team2: 123
		// 	},
		// 	alliance2: {
		// 		team1: 123,
		// 		team2: 123
		// 	}
		// }

		// Data comes in this form, I think.
		// eventData = {
		// 	metaData: {
		// 		toaEventKey: 'abc',	//The event ID
		// 		matches: 123 //how many matches given
		// 	},
		// 	data:{
		// 		matchData: [
		// 			{
		// 				matchNumber: 123,
		// 				teams: {
		// 					red1: 123,
		// 					red2: 123,
		// 					blue1: 123,
		// 					blue2: 123
		// 				},
		// 				winner: 'abc', //'blue', 'red', 'tie'
		// 				score:{
		// 					auto:{
		// 						red: 123, //red alliance autonomous score
		// 						blue: 123 //blue alliance autonomous score
		// 					},
		// 					driver:{
		// 						red: 123, //red alliance tele-op score
		// 						blue: 123 //blue alliance tele-op score
		// 					},
		// 					end:{
		// 						red: 123, //red alliance end-game score
		// 						blue: 123 //blue alliance end-game score
		// 					},
		// 					total:{
		// 						red: 123, //red alliance total score
		// 						blue: 123 //blue alliance total score
		// 					},
		// 					penalty:{
		// 						red: 123, //red alliance penalty score
		// 						blue: 123 //blue alliance penalty score
		// 					},
		// 					final:{
		// 						red: 123, //red alliance final score
		// 						blue: 123 //blue alliance final score
		// 					}
		// 				}
		// 			}
		// 		],
		// 		gameData: [
		// 			{
		// 				matchNumber: 123,
		// 				teams: [123, 123],
		// 				gameInformation:{	//CHECK IF ALL THSES TYPES ARE CORRECT AND ALSO HAVE COFRRECT MEANING!
		// 					auto:{
		// 						jewel: 123,
		// 						glyphs: 123,
		// 						keys: 123,
		// 						park: 123
		// 					},
		// 					driver:{
		// 						glyphs: 123,
		// 						rows: 123,
		// 						columns: 123,
		// 						cypher: 123
		// 					},
		// 					end:{
		// 						relic1: 123,	//Amount of relics in that zone
		// 						relic2: 123,
		// 						relic3: 123,
		// 						relicsUp: 123,	//Amount of relects standing up
		// 						balanced: 123	//How many robots are balanced
		// 					}
		// 				}
		// 			}
		// 		]	
		// 	}
		// }

		var result = {
			prediction: {},
			model: []
		}

		// results must be in this form to be exported into analyzizer
		// result = {
		// 	prediction: {		//REQUIRED?
		// 		winner: 'abc',	//Alliance1 or Alliance2
		// 		chance: .123,	//Chance this is winner in 00.00%	-1 if no value
		// 		alliance1: {
		// 			score: .123	//predicted score
		// 		},
		// 		alliance2: {
		// 			score: .123
		// 		}
		// 	},
		// 	model: [	//For every match given
		// 		{
		// 			matchNumber: 123,
		// 			prediction: 'abc',	//red or blue
		// 			blueScore: 123,
		// 			redScore: 123,
		// 			certainty: .123		//as 00.00%; -1 if no value
		// 		}
		// 	]
		// }

		//				README:
		// All the data your algorithm will be given is shown above, 
		// as well as the way your algorithm must respond to the data

		// You will always be given matchData but may not always be given gameData

		//use eventData.data.hasOwnProperty('gameData') to check if there is gameData

		// There are two things your algorithm should/can do:
		// 	1. there is a prediction; 	(result.prediction)
		// 		your algorithm will be given two team numbers and your algorithm must determine 
		// 		who will win, with what score, and how certain you are about that prediction

		// 	2. There is a modeling rate;	(result.model)
		// 		It must model all the data it was given. basially it would be predicting on
		// 		all the matches it had so far

		// In the case you cannot produce a data point (any value for) do NOT guess, just use the value -1

		//---------------------------Any code you need to make would go here:


		//-------------------------------------------------------------------

		//Generalized modeling forloop model
		for (var i = 0; i < eventData.data.length; i++) {
			//Runs through every match IN THE DATA SET CURRENTLY allowing you do run your prediction algorithmsn
			//eventData.data[i] is a match (shown above)
			result.model[i] = {
				//Match Number; Acual score; PREDICTION; certiantiny (or any number 0-100)
				matchNumber: eventData.data.matchData[i].matchNumber, //Shouldnt change
				//--------------------------THIS IS WHERE YOU PUT YOUR PREDICTION MODEL RESULT-------------------------
				prediction: math.round(math.random()*100) < 50 ? 'red' : 'blue',	//YOU CAHNGE THIS; This is your prediction of your match; either 'tie', 'red', or 'blue'
				certainty: 50.00	//YOU CHANGE THIS: THIS IS YOUR CERTAINTY (or any number between 0-100 about how you feel of this prediction of this match)
				//-------------------------------------------------------------------------------------------------------
			}
		}

		//Generalized prediction model
		result.prediction = {		//REQUIRED?
			winner: math.round(math.random()*100) < 50 ? 'red' : 'blue',	//Alliance1 or Alliance2
			chance: 50.00,	//Chance this is winner in 00.00%	-1 if no value
			alliance1: {
				score: math.round(math.random()*100)	//predicted score
			},
			alliance2: {
				score: math.round(math.random()*100)
			}
		}

		return result
	},

	null: function(localData){
		localData = localDataFormat(localData)

		//for statsical script testing purposes;

		var results = []

		//Generalized prediction forloop model
		for (var i = 0; i < localData.length; i++) {
			results[i] = [
				localData[i].matchNumber,
				localData[i].score.total.red == localData[i].score.total.blue ? 'tie' : localData[i].score.total.red < localData[i].score.total.blue ? 'blue' : 'red',
				-1,
				-1
			]
		}

		return results
	},

	random: function(eventData, query){

		var result = {
			prediction: {},
			model: []
		}

		for (var i = 0; i < eventData.data.length; i++) {
			result.model[i] = {
				matchNumber: eventData.data.matchData[i].matchNumber, //Shouldnt change
				prediction: math.round(math.random()*100) < 50 ? 'red' : 'blue',
				certainty: 50.00
			}
		}

		result.prediction = {		//REQUIRED?
			winner: math.round(math.random()*100) < 50 ? 'red' : 'blue',	//Alliance1 or Alliance2
			chance: 50.00,	//Chance this is winner in 00.00%	-1 if no value
			alliance1: {
				score: math.round(math.random()*100)	//predicted score
			},
			alliance2: {
				score: math.round(math.random()*100)
			}
		}

		return result
	}
}