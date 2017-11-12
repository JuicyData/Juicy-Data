module.exports = function() {
	axios = require('axios')
	var toaApi = axios.create({
		baseURL: 'http://theorangealliance.org/apiv2/',
		timeout: 1000,
		headers: {'X-Application-Origin': 'JuicyData', 'X-TOA-Key': 'SOME KEY THATS IN THE CONFIG FILE!!!!'}
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

					//This is a seperate Var, can be moved down into or out of for loop since this should be unchanging.
					var eventInformation = {
						date: event.start_date, //Should be ISODate Type thingy....? (need to check latter)
						locationID: 'Lol..' //ObjectId Type; need to querry database for this location ID....
					}
					// var eventInformation:{
					// 	date: ISODate(), //ISO Date of when it occured; 
					// 	locationID: ObjectId() //ID of the location in the 'places' collection
					// }
					var matchData = {
						eventInformation: eventInformation,
						matchInformation:{
							matchNumber: Number(matchNumber)
						},
						resultInformation:{
							winner: match.red_score > match.blue_score ? 'red' : match.blue_score > match.red_score ? 'blue' : 'tie', //Pls check latter if "score" indlues penailtyes for this caluclation
							score:{
								auto:{
									red: match.red_auto_score,
									blue: match.blue_auto_score
								},
								driver:{
									red: match.red_tele_score,
									blue: match.blue_tele_score
								},
								end:{
									red: match.red_end_score,
									blue: match.blue_end_score
								},
								total:{
									red: match.red_score - match.blue_penalty, //I think that blue penialty is the penailty blue gets
									blue: match.blue_score - mathc.red_penalty //And score is their total (penailty + score)
									// red: match.red_auto_score + match.red_tele_score + match.red_end_score,
									// blue: match.blue_auto_score + match.blue_tele_score + match.blue_end_score
								},
								penalty:{
									red: match.red_penalty,
									blue: match.blue_penalty
								},
								final:{
									red: match.red_score,
									blue: match.blue_score
								}
							}
						}
					}
					console.log(JSON.stringify(matchData, null, 2))
					console.log()
				}
			}
		})
	})
}