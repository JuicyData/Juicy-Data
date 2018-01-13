//orangeStand by Michael Leonffu
// var MongoClient = require('mongodb').MongoClient
// var configDB = require('./../config/database.js')
// ObjectId = require('mongodb').ObjectID

//This handles putting the data into the database to present onto the website; all this really does is a mongodb insert or update.

var orangeStand = function(mongodb, orchard, pickedRankingOranges, pickedMatchHistoryOranges, calculatedJuice, pickedOrchardOranges, orangeStandMenu){
	console.log('[START]-orangeStand')
	var standTime = new Date()

	// rankingsJuice requires all the information that goes into the rankings tab in the UI:
	// 	Team number, team name (not from any spesififc picker or peeler)
	//	This is ranking information form the ranking picker and peeler ->
	// 		Rank,
	// 		record T-W-L,
	// 		Qp, Rp,
	//	This would be from the averages picker and peeler ->
	// 		OPR, CCWM, OPR, OPR, OPR
	// Both combine into making the rankings tab; rankings Juice.

	//rankings should be in the form of:
	// ranking:[
	// 	{
	// 		rank: 123,
	// 		teamNumber: 123,
	// 		teamName: 123,
	// 		record:{
	// 			wins: 123,
	// 			losses: 123,
	// 			ties: 123
	// 		},
	// 		qualifyingPoints: 123,
	// 		rankingPoints: 123,
	// 		averageScore: .123,
	// 		averageMarginalScore: .123,
	// 		average:{
	// 			auto: .123,
	// 			driver: .123,
	// 			end: .123
	// 		}
	// 	}
	// ]

	// form of average picker peeler is in 
	// {
	// 	juice: {
	// 		'123' : .123
	// 	},
	// 	error: .123
	// }

	// form of rankings picker peeler is in
	// {
	// 	rankings: [
	// 		{
	// 			teamName: 'abc',
	// 			teamNumber: 123,
	// 			record: {
	// 				wins: 123,
	// 				lossess: 123,
	// 				ties: 123
	// 			},
	// 			qualifyingPoints: 123,
	// 			rankingPoints: 123,
	// 			rank: 123
	// 		}
	// 	]
	// }

	//console.log('orchard', orchard)
	//console.log('pickedRankingOranges', pickedRankingOranges)
	//console.log('calculatedJuice', calculatedJuice)
	//console.log('pickedMatchHistoryOranges',pickedMatchHistoryOranges[0].gameData)

	//Rankings:
	var ranking = []

	for (var i = 0; i < pickedRankingOranges.length; i++) {
		//pickedRankingOranges[i]
		ranking[i] = {
			rank: i+1,
			teamNumber: pickedRankingOranges[i]._id,
			teamName: pickedRankingOranges[i].teamName,
			record: {
				wins: pickedRankingOranges[i].wins,
				losses: pickedRankingOranges[i].losses,
				ties: pickedRankingOranges[i].ties
			},
			qualifyingPoints: pickedRankingOranges[i].qualifyingPoints,
			rankingPoints: pickedRankingOranges[i].rankingPoints,
			averageScore: calculatedJuice == 'Not juicy enough' ? 'NJE' :calculatedJuice.offensiveOranges.juice[String(pickedRankingOranges[i]._id)],
			averageMarginalScore: calculatedJuice == 'Not juicy enough' ? 'NJE' :calculatedJuice.marginalOranges.juice[String(pickedRankingOranges[i]._id)],
			average:{
				auto: 		calculatedJuice == 'Not juicy enough' ? 'NJE' :calculatedJuice.scoreAutoOranges		.juice[String(pickedRankingOranges[i]._id)],
				driver: 	calculatedJuice == 'Not juicy enough' ? 'NJE' :calculatedJuice.scoreDriverOranges		.juice[String(pickedRankingOranges[i]._id)],
				end: 		calculatedJuice == 'Not juicy enough' ? 'NJE' :calculatedJuice.scoreEndOranges			.juice[String(pickedRankingOranges[i]._id)]
			}
		}
	}

	//Match history:
	var matchHistory = []

	var rankingsJson = {}

	for (var i = 0; i < ranking.length; i++) {
		//ranking[i]
		rankingsJson[String(ranking[i].teamNumber)] = ranking[i]
	}

	for (var i = 0; i < pickedMatchHistoryOranges.length; i++) {
		//pickedMatchHistoryOranges[i]
		matchHistory[i] = {
			matchNumber: pickedMatchHistoryOranges[i]._id.matchNumber,
			alliance: pickedMatchHistoryOranges[i]._id.alliance,
			team1: {
				teamNumber: pickedMatchHistoryOranges[i].teams.team1.teamNumber,
				teamName: rankingsJson[String(pickedMatchHistoryOranges[i].teams.team1.teamNumber)].teamName,
				rank: rankingsJson[String(pickedMatchHistoryOranges[i].teams.team1.teamNumber)].rank,
				surrogate: pickedMatchHistoryOranges[i].teams.team1.surrogate
			},
			team2: {
				teamNumber: pickedMatchHistoryOranges[i].teams.team2.teamNumber,
				teamName: rankingsJson[String(pickedMatchHistoryOranges[i].teams.team2.teamNumber)].teamName,
				rank: rankingsJson[String(pickedMatchHistoryOranges[i].teams.team2.teamNumber)].rank,
				surrogate: pickedMatchHistoryOranges[i].teams.team2.surrogate
			},
			result: {
				total: pickedMatchHistoryOranges[i].matchData.resultInformation.score.total[String(pickedMatchHistoryOranges[i]._id.alliance)],
				penalty: pickedMatchHistoryOranges[i].matchData.resultInformation.score.penalty[String(pickedMatchHistoryOranges[i]._id.alliance)],
				final: pickedMatchHistoryOranges[i].matchData.resultInformation.score.final[String(pickedMatchHistoryOranges[i]._id.alliance)]
			},
			prediction: 'red',
			winner: pickedMatchHistoryOranges[i].matchData.resultInformation.winner,
			gameInformation: pickedMatchHistoryOranges[i].gameData.gameInformation
		}
	}

	//Average Scores:
	var averageScores = []

	for (var i = 0; i < pickedRankingOranges.length; i++) {
		//pickedRankingOranges[i]
		//using picked RankingOrangees to have a team list
		averageScores[i] = {
			teamNumber: pickedRankingOranges[i]._id,
			teamName: pickedRankingOranges[i].teamName,
			averageScore: 			calculatedJuice == 'Not juicy enough' ? 'NJE' :calculatedJuice.offensiveOranges		.juice[String(pickedRankingOranges[i]._id)],	//Maybe it dont need String()
			averageMarginalScore: 	calculatedJuice == 'Not juicy enough' ? 'NJE' :calculatedJuice.marginalOranges			.juice[String(pickedRankingOranges[i]._id)],
			average: {
				auto: 				calculatedJuice == 'Not juicy enough' ? 'NJE' :calculatedJuice.scoreAutoOranges		.juice[String(pickedRankingOranges[i]._id)],
				driver: 			calculatedJuice == 'Not juicy enough' ? 'NJE' :calculatedJuice.scoreDriverOranges		.juice[String(pickedRankingOranges[i]._id)],
				end: 				calculatedJuice == 'Not juicy enough' ? 'NJE' :calculatedJuice.scoreEndOranges			.juice[String(pickedRankingOranges[i]._id)]
			},
			gameAverages: {
				auto: {
					jewel:			calculatedJuice == 'Not juicy enough' ? 'NJE' :calculatedJuice.autoJewelOranges		.juice[String(pickedRankingOranges[i]._id)],
					glyphs:			calculatedJuice == 'Not juicy enough' ? 'NJE' :calculatedJuice.autoGlyphsOranges		.juice[String(pickedRankingOranges[i]._id)],
					keys:			calculatedJuice == 'Not juicy enough' ? 'NJE' :calculatedJuice.autoKeysOranges			.juice[String(pickedRankingOranges[i]._id)],
					park:			calculatedJuice == 'Not juicy enough' ? 'NJE' :calculatedJuice.autoParkOranges			.juice[String(pickedRankingOranges[i]._id)]
				},
				driver: {
					glyphs:			calculatedJuice == 'Not juicy enough' ? 'NJE' :calculatedJuice.driverGlyphsOranges		.juice[String(pickedRankingOranges[i]._id)],
					rows:			calculatedJuice == 'Not juicy enough' ? 'NJE' :calculatedJuice.driverRowsOranges		.juice[String(pickedRankingOranges[i]._id)],
					columns:		calculatedJuice == 'Not juicy enough' ? 'NJE' :calculatedJuice.driverColumnsOranges	.juice[String(pickedRankingOranges[i]._id)],
					cypher:			calculatedJuice == 'Not juicy enough' ? 'NJE' :calculatedJuice.driverCypherOranges		.juice[String(pickedRankingOranges[i]._id)]
				},
				end: {
					relic1:			calculatedJuice == 'Not juicy enough' ? 'NJE' :calculatedJuice.endRelic1Oranges		.juice[String(pickedRankingOranges[i]._id)],
					relic2:			calculatedJuice == 'Not juicy enough' ? 'NJE' :calculatedJuice.endRelic2Oranges		.juice[String(pickedRankingOranges[i]._id)],
					relic3:			calculatedJuice == 'Not juicy enough' ? 'NJE' :calculatedJuice.endRelic3Oranges		.juice[String(pickedRankingOranges[i]._id)],
					relicsUp:		calculatedJuice == 'Not juicy enough' ? 'NJE' :calculatedJuice.endRelicsUpOranges		.juice[String(pickedRankingOranges[i]._id)],
					balanced:		calculatedJuice == 'Not juicy enough' ? 'NJE' :calculatedJuice.endBalancedOranges		.juice[String(pickedRankingOranges[i]._id)]
				}
			}
		}
	}

	//Saving it to the dataBase
	// MongoClient.connect(configDB.url, function(err,db){
	// 	if(err){
	// 		console.log(err)
	// 		return
	// 	}
		mongodb.db.collection('eventOut').save(
			{
				_id: orchard,	//orcahrd is toaeventkey
				lastUpdated: new Date(), //Time of insert/update
				eventInformation: pickedOrchardOranges.eventInformation,
				ranking: ranking,
				matchHistory: matchHistory,
				averageScores: averageScores
			},
			function(err, result){
				if(err){
					orangeStandMenu('Failure')
					console.log(err)
					// db.close()
					return
				}else{
					if(result.result.ok == 1){
						console.log('Operation orangeStand time(Milliseconds):',new Date(new Date()-standTime).getMilliseconds())
						console.log('[DONE]-orangeStand')
						orangeStandMenu('Sucess')
						// db.close()
					}else{
						orangeStandMenu('Failure 2.0')
						// db.close()
					}
				}
			}
		)
	// })
}

module.exports = orangeStand

// To use in another file:
// var orangeStand = require('./orangeStand')
// orangeStand.orangeStand(pickedOranges, STUFf)
// Where STUFf is the callback function returning a json