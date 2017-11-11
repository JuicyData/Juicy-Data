module.exports = function() {
	axios = require('axios')
	var toaApi = axios.create({
		baseURL: 'http://theorangealliance.org/apiv2/',
		timeout: 1000,
		headers: {'X-Application-Origin': 'JuicyData', 'X-TOA-Key': '***REMOVED***'}
	})

	//To get specific match
	// toaApi.get('/match/1718-NCAL-RWC-Q001-1').then(function(response) {
	// 	console.log(response.data);
	// })

	toaApi.get('/event/1718-NCAL-RWC').then(function(response) {
		var event = response.data[0];
		toaApi.get('/event/1718-NCAL-RWC/matches').then(function(response) {
			var matches = response.data;
			for (var match of response.data) {
				var matchNumber
				if (matchNumber = match.match_name.split('Quals ')[1]) {
					var matchData = {};
					matchData.matchInformation = {}
					matchData.matchInformation.matchDate = event.start_date
					matchData.matchInformation.matchLocationID = 'someplace'
					matchData.matchInformation.matchNumber = Number(matchNumber)
					matchData.resultInformation = {}
					matchData.resultInformation.winner = match.red_score > match.blue_score ? 'red' : match.blue_score > match.red_score ? 'blue' : 'tie'
					matchData.resultInformation.score = {}
					matchData.resultInformation.score.auto = {}
					matchData.resultInformation.score.auto.red = match.red_auto_score
					matchData.resultInformation.score.auto.blue = match.blue_auto_score
					matchData.resultInformation.score.tele = {}
					matchData.resultInformation.score.tele.red = match.red_tele_score
					matchData.resultInformation.score.tele.blue = match.blue_tele_score
					matchData.resultInformation.score.end = {}
					matchData.resultInformation.score.end.red = match.red_end_score
					matchData.resultInformation.score.end.blue = match.blue_end_score
					matchData.resultInformation.score.total = {}
					matchData.resultInformation.score.total.red = match.red_score - match.red_penalty
					matchData.resultInformation.score.total.blue = match.blue_score - match.blue_penalty
					matchData.resultInformation.score.penalty = {}
					matchData.resultInformation.score.penalty.red = match.red_penalty
					matchData.resultInformation.score.penalty.blue = match.blue_penalty
					matchData.resultInformation.score.final = {}
					matchData.resultInformation.score.final.red = match.red_score
					matchData.resultInformation.score.final.blue = match.blue_score
					console.log(JSON.stringify(matchData, null, 2))
					console.log()
				}
			}
		})
	})
}