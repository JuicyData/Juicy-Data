//calculatedAverageSimple by Michael Leonffu

var juicyCalculator = require('./juicyCalculator')
var algorithmHelpers = require('./helper')

module.exports = {

	OPR: function(eventData, query){

		orange = {
			labels: [],
			juice: [],
			result: []
		}

		orange.labels = algorithmHelpers.generateUniqueList(eventData.data.matchData)
		orange.labels.sort()
		var formattedMatchData = algorithmHelpers.formattingMatchData(eventData.data.matchData)

		// formattedMatchData: [
		// 	{
		// 		matchNumber: 123,
		// 		teams: [123, 123],
		// 		score:{
		// 			auto: 123,
		// 			driver: 123,
		// 			end: 123,
		// 			total: 123,
		// 			penalty: 123,
		// 			final: 123
		// 		}
		// 	}
		// ]

		//Makeing the juice and result
		for (var i = 0; i < formattedMatchData.length; i++) {
			//formattedMatchData[i]
			orange.result.push(formattedMatchData[i].score.total)
			orange.juice[i] = []
			for (var j = 0; j < orange.labels.length; j++) {
				//orange.labels[j]
				orange.juice[i][j] = formattedMatchData[i].teams.includes(Number(orange.labels[j]))? 1:0
			}
		}

		var juicyOPR = juicyCalculator(orange)

		if(juicyOPR == -1){
			return -1
		}

		var result = {
			prediction: {},
			model: []
		}

		//var maxCombineOPR = 0

		//Modleing
		// for (var i = 0; i < eventData.matchData.length; i++) {
		// 	results[i] = [
		// 		eventData.matchData[i].matchNumber, 
		// 		eventData.matchData[i].score.total.red == eventData.matchData[i].score.total.blue ? 'tie' : eventData.matchData[i].score.total.red < eventData.matchData[i].score.total.blue ? 'blue' : 'red',
		// 		juicyOPR.juice[String(eventData.matchData[i].teams.red1)] + juicyOPR.juice[String(eventData.matchData[i].teams.red2)] == juicyOPR.juice[String(eventData.matchData[i].teams.blue1)] + juicyOPR.juice[String(eventData.matchData[i].teams.blue2)] ? 'tie' : juicyOPR.juice[String(eventData.matchData[i].teams.red1)] + juicyOPR.juice[String(eventData.matchData[i].teams.red2)] < juicyOPR.juice[String(eventData.matchData[i].teams.blue1)] + juicyOPR.juice[String(eventData.matchData[i].teams.blue2)] ? 'blue' : 'red'
		// 	]
		// 	if(math.abs(juicyOPR.juice[String(eventData.matchData[i].teams.red1)] + juicyOPR.juice[String(eventData.matchData[i].teams.red2)] - juicyOPR.juice[String(eventData.matchData[i].teams.blue1)] - juicyOPR.juice[String(eventData.matchData[i].teams.blue2)])  > maxCombineOPR){
		// 		maxCombineOPR = math.abs(juicyOPR.juice[String(eventData.matchData[i].teams.red1)] + juicyOPR.juice[String(eventData.matchData[i].teams.red2)] - juicyOPR.juice[String(eventData.matchData[i].teams.blue1)] - juicyOPR.juice[String(eventData.matchData[i].teams.blue2)])
		// 	}
		// }

		// for (var i = 0; i < eventData.matchData.length; i++) {
		// 	results[i][3] = math.round(100*(math.abs(juicyOPR.juice[String(eventData.matchData[i].teams.red1)] + juicyOPR.juice[String(eventData.matchData[i].teams.red2)] - juicyOPR.juice[String(eventData.matchData[i].teams.blue1)] - juicyOPR.juice[String(eventData.matchData[i].teams.blue2)])/maxCombineOPR), 3)
		// }

		//Predictions:
		result.prediction = {
			winner: orange.juice[query.alliance1.team1] + orange.juice[query.alliance1.team2] == orange.juice[query.alliance2.team1] + orange.juice[query.alliance2.team2]? 'tie' : orange.juice[query.alliance1.team1] + orange.juice[query.alliance1.team2] < orange.juice[query.alliance2.team1] + orange.juice[query.alliance2.team2]? 'alliance2' : 'alliance1',
			chance: (((juicyOPR.juice[query.alliance1.team1] + juicyOPR.juice[query.alliance1.team2])/(juicyOPR.juice[query.alliance2.team1] + juicyOPR.juice[query.alliance2.team2])) < 1? ((juicyOPR.juice[query.alliance2.team1] + juicyOPR.juice[query.alliance2.team2])/(juicyOPR.juice[query.alliance1.team1] + juicyOPR.juice[query.alliance1.team2])) : ((juicyOPR.juice[query.alliance1.team1] + juicyOPR.juice[query.alliance1.team2])/(juicyOPR.juice[query.alliance2.team1] + juicyOPR.juice[query.alliance2.team2]))) * 100,
			alliance1: {
				score: juicyOPR.juice[query.alliance1.team1] + juicyOPR.juice[query.alliance1.team2]
			},
			alliance2: {
				score: juicyOPR.juice[query.alliance2.team1] + juicyOPR.juice[query.alliance2.team2]
			}
		}

		return result
	},

	// CCWM: function(localData){
	// 	localData = localDataFormat(localData)

	// 	orange = {
	// 		labels: [],
	// 		juice: [],
	// 		result: []
	// 	}

	// 	orange.labels = algorithmHelpers.generateUniqueList(localData)

	// 	//For red
	// 	for (var i = 0; i < localData.length; i++) {
	// 		//localData[i]
	// 		orange.juice[i] = []
	// 		for (var j = 0; j < orange.labels.length; j++) {
	// 			if(orange.labels[j] == String(localData[i].teams.red1)){
	// 				orange.juice[i][j] = 1
	// 			}else{
	// 				if(orange.labels[j] == String(localData[i].teams.red2)){
	// 					orange.juice[i][j] = 1
	// 				}else{
	// 					orange.juice[i][j] = 0
	// 				}
	// 			}
	// 		}
	// 		orange.result[i] = [localData[i].score.total.red - localData[i].score.total.blue]
	// 	}

	// 	//For blue
	// 	for (var i = 0; i < localData.length; i++) {
	// 		var orangeJuiceLength = orange.juice.length
	// 		orange.juice[orangeJuiceLength] = []
	// 		for (var j = 0; j < orange.labels.length; j++) {
	// 			if(orange.labels[j] == String(localData[i].teams.blue1)){
	// 				orange.juice[orangeJuiceLength][j] = 1
	// 			}else{
	// 				if(orange.labels[j] == String(localData[i].teams.blue2)){
	// 					orange.juice[orangeJuiceLength][j] = 1
	// 				}else{
	// 					orange.juice[orangeJuiceLength][j] = 0
	// 				}
	// 			}
	// 		}
	// 		orange.result[orangeJuiceLength] = [localData[i].score.total.blue - localData[i].score.total.red]
	// 	}

	// 	var juicyOPR = juicyCalculator(orange)

	// 	if(juicyOPR == -1){
	// 		return -1
	// 	}

	// 	var results = []

	// 	var maxCombineOPR = 0

	// 	//Predictions
	// 	for (var i = 0; i < localData.length; i++) {
	// 		results[i] = [
	// 			localData[i].matchNumber, 
	// 			localData[i].score.total.red == localData[i].score.total.blue ? 'tie' : localData[i].score.total.red < localData[i].score.total.blue ? 'blue' : 'red',
	// 			juicyOPR.juice[String(localData[i].teams.red1)] + juicyOPR.juice[String(localData[i].teams.red2)] == juicyOPR.juice[String(localData[i].teams.blue1)] + juicyOPR.juice[String(localData[i].teams.blue2)] ? 'tie' : juicyOPR.juice[String(localData[i].teams.red1)] + juicyOPR.juice[String(localData[i].teams.red2)] < juicyOPR.juice[String(localData[i].teams.blue1)] + juicyOPR.juice[String(localData[i].teams.blue2)] ? 'blue' : 'red'
	// 		]
	// 		if(math.abs(juicyOPR.juice[String(localData[i].teams.red1)] + juicyOPR.juice[String(localData[i].teams.red2)] - juicyOPR.juice[String(localData[i].teams.blue1)] - juicyOPR.juice[String(localData[i].teams.blue2)])  > maxCombineOPR){
	// 			maxCombineOPR = math.abs(juicyOPR.juice[String(localData[i].teams.red1)] + juicyOPR.juice[String(localData[i].teams.red2)] - juicyOPR.juice[String(localData[i].teams.blue1)] - juicyOPR.juice[String(localData[i].teams.blue2)])
	// 		}
	// 	}

	// 	for (var i = 0; i < localData.length; i++) {
	// 		results[i][3] = math.round(100*(math.abs(juicyOPR.juice[String(localData[i].teams.red1)] + juicyOPR.juice[String(localData[i].teams.red2)] - juicyOPR.juice[String(localData[i].teams.blue1)] - juicyOPR.juice[String(localData[i].teams.blue2)])/maxCombineOPR), 3)
	// 	}

	// 	return results
	// }

}