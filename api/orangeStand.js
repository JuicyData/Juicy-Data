//orangeStand by Michael Leonffu
var MongoClient = require('mongodb').MongoClient
var configDB = require('./../config/database.js')
ObjectId = require('mongodb').ObjectID

//This handles putting the data into the database to present onto the website; all this really does is a mongodb insert or update.

var orangeStand = function(orchard, pickedRankingOranges, calculatedJuice, orangeStandMenu){
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

	//Rankings:
	var ranking = []
	console.log('orchard', orchard)
	console.log('pickedRankingOranges', pickedRankingOranges)
	console.log('calculatedJuice', calculatedJuice)

	for (var i = 0; i < pickedRankingOranges.length; i++) {
		//pickedRankingOranges[i]
		ranking[i] = {
			rank: i+1,
			teamNumber: pickedRankingOranges[i]._id,
			teamName: 'Anna Li', //Will get the thing latter
			record: {
				wins: pickedRankingOranges[i].wins,
				losses: pickedRankingOranges[i].losses,
				ties: pickedRankingOranges[i].ties
			},
			qualifyingPoints: pickedRankingOranges[i].qualifyingPoints,
			rankingPoints: pickedRankingOranges[i].rankingPoints,
			averageScore: calculatedJuice.calculatedOffensiveJuice.juice[String(pickedRankingOranges[i]._id)],
			averageMarginalScore: calculatedJuice.calculatedMarginalJuice.juice[String(pickedRankingOranges[i]._id)]
			// average:{
			// 	auto: .123,
			// 	driver: .123,
			// 	end: .123
			// }
		}
	}

	MongoClient.connect(configDB.url, function(err,db){
		if(err){
			console.log(err)
			return
		}
		db.collection('eventOut').save(
			{
				_id: orchard,	//orcahrd is toaeventkey
				lastUpdated: new Date(), //Time of insert/update
				ranking: ranking
			},
			function(err, result){
				if(err){
					orangeStandMenu('Failure')
					console.log(err)
					db.close()
					return
				}else{
					if(result.result.ok == 1){
						orangeStandMenu('Sucess')
						db.close()
					}else{
						orangeStandMenu('Failure 2.0')
						db.close()
					}
				}
			}
		)
	})
}

module.exports = {
	orangeStand: orangeStand
}

// To use in another file:
// var orangeStand = require('./orangeStand')
// orangeStand.orangeStand(pickedOranges, STUFf)
// Where STUFf is the callback function returning a json