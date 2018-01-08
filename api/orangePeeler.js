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

	var pickedOrange = {
		teamsScore: [],
		teamsList: pickedOranges[0].teamsList
	}
	//If threre are no errors then:

	var peeledOrangeBasket = []	//Contains all the peeled genericOrangeTemplate

	//Converting all the keys into other keys
	for (var i = 0; i < pickedOranges[0].teamsScore.length; i++) {
		//pickedOranges[0].teamsScore[i]
		pickedOrange.teamsScore[i] = {
			teams: pickedOranges[0].teamsScore[i].teams,
			//This is converstion factor GENERTIC
			scoreAuto: 			pickedOranges[0].teamsScore[i].		score.auto,
			scoreDriver: 		pickedOranges[0].teamsScore[i].		score.driver,
			scoreEnd: 			pickedOranges[0].teamsScore[i].		score.end,
			scoreTotal: 		pickedOranges[0].teamsScore[i].		score.total,
			scorePenalty: 		pickedOranges[0].teamsScore[i].		score.penalty,
			scoreFinal: 		pickedOranges[0].teamsScore[i].		score.final,
			scoreMarginalScore: pickedOranges[0].teamsScore[i].		score.marginalScore,
			//This is conversion factor UNIQUE TO SEASON
			autoJewel: 			pickedOranges[0].teamsScore[i].		gameData.auto.jewel,
			autoGlyphs: 		pickedOranges[0].teamsScore[i].		gameData.auto.glyphs,
			autoKeys: 			pickedOranges[0].teamsScore[i].		gameData.auto.keys,
			autoPark: 			pickedOranges[0].teamsScore[i].		gameData.auto.park,

			driverGlyphs: 		pickedOranges[0].teamsScore[i].		gameData.driver.glyphs,
			driverRows: 		pickedOranges[0].teamsScore[i].		gameData.driver.rows,
			driverColumns: 		pickedOranges[0].teamsScore[i].		gameData.driver.columns,
			driverCypher: 		pickedOranges[0].teamsScore[i].		gameData.driver.cypher,

			endRelic1: 			pickedOranges[0].teamsScore[i].		gameData.end.relic1,
			endRelic2: 			pickedOranges[0].teamsScore[i].		gameData.end.relic2,
			endRelic3: 			pickedOranges[0].teamsScore[i].		gameData.end.relic3,
			endRelicsUp: 		pickedOranges[0].teamsScore[i].		gameData.end.relicsUp,
			endBalanced: 		pickedOranges[0].teamsScore[i].		gameData.end.balanced
		}
	}

	var orangeConversionFactor = [	//Helps convert oranges into generic form
		//GENERIC CONVERSION:
		['scoreAutoOranges'			,		'scoreAuto'				],
		['scoreDriverOranges'		,		'scoreDriver'			],
		['scoreEndOranges'			,		'scoreEnd'				],
		//['scoreTotalOranges'		,		'scoreTotal'			],
		['offensiveOranges'			, 		'scoreTotal'			],
		['scorePenaltyOranges'		,		'scorePenalty'			],
		['scoreFinalOranges'		,		'scoreFinal'			],
		//['scoreMarginalScore'		, 		'scoreMarginalScore'	],
		['marginalOranges'			, 		'scoreMarginalScore'	],

		//concersion UNIQUE TO SEASON
		['autoJewelOranges'			,		'autoJewel'				],
		['autoGlyphsOranges'		,		'autoGlyphs'			],
		['autoKeysOranges'			,		'autoKeys'				],
		['autoParkOranges'			,		'autoPark'				],

		['driverGlyphsOranges'		,		'driverGlyphs'			],
		['driverRowsOranges'		,		'driverRows'			],
		['driverColumnsOranges'		,		'driverColumns'			],
		['driverCypherOranges'		,		'driverCypher'			],

		['endRelic1Oranges'			,		'endRelic1'				],
		['endRelic2Oranges'			,		'endRelic2'				],
		['endRelic3Oranges'			,		'endRelic3'				],
		['endRelicsUpOranges'		,		'endRelicsUp'			],
		['endBalancedOranges'		,		'endBalanced'			]
	]

	var peelerTimer = new Date()

	for (var i = 0; i < orangeConversionFactor.length; i++) {
		//orangeConversionFactor[i]
		var tempOrange = {
			labels: pickedOrange.teamsList.sort(),
			juice: [],
			result: []
		}	//Get a fresh template
		for (var j = 0; j < pickedOrange.teamsScore.length; j++) {	//May be backwards bc of this
			tempOrange.result.push([pickedOrange.teamsScore[j][orangeConversionFactor[i][1]]])	//FIX LATTer
			tempOrange.juice[j] = []
			for (var k = 0; k < tempOrange.labels.length; k++) {
				tempOrange.juice[j][k] = pickedOrange.teamsScore[j].teams[0] == tempOrange.labels[k] || pickedOrange.teamsScore[j].teams[1] == tempOrange.labels[k]?1:0
			}
		}
		//tempOrange.result.reverse() //It's backwards?
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