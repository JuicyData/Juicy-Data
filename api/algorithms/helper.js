//helper by Michael Leonffu

module.exports = {
	generateUniqueList: function(data){

		// data = [
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
		for (var i = 0; i < data.length; i++) {
			if(-1 == uniqueList.indexOf(String(data[i].teams.red1))){
				uniqueList.push(String(data[i].teams.red1))
			}
			if(-1 == uniqueList.indexOf(String(data[i].teams.red2))){
				uniqueList.push(String(data[i].teams.red2))
			}
			if(-1 == uniqueList.indexOf(String(data[i].teams.blue1))){
				uniqueList.push(String(data[i].teams.blue1))
			}
			if(-1 == uniqueList.indexOf(String(data[i].teams.blue2))){
				uniqueList.push(String(data[i].teams.blue2))
			}
		}
		return uniqueList
	},

	formattingMatchData: function(data){
		// matchData: [
		// 	{
		// 		matchNumber: 123,
		// 		teams: {
		// 			red1: 123,
		// 			red2: 123,
		// 			blue1: 123,
		// 			blue2: 123
		// 		},
		// 		winner: 'abc', //'blue', 'red', 'tie'
		// 		score:{
		// 			auto:{
		// 				red: 123, //red alliance autonomous score
		// 				blue: 123 //blue alliance autonomous score
		// 			},
		// 			driver:{
		// 				red: 123, //red alliance tele-op score
		// 				blue: 123 //blue alliance tele-op score
		// 			},
		// 			end:{
		// 				red: 123, //red alliance end-game score
		// 				blue: 123 //blue alliance end-game score
		// 			},
		// 			total:{
		// 				red: 123, //red alliance total score
		// 				blue: 123 //blue alliance total score
		// 			},
		// 			penalty:{
		// 				red: 123, //red alliance penalty score
		// 				blue: 123 //blue alliance penalty score
		// 			},
		// 			final:{
		// 				red: 123, //red alliance final score
		// 				blue: 123 //blue alliance final score
		// 			}
		// 		}
		// 	}
		// ]

		// to be 

		// matchData: [
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

		var formattedData = []

		for (var i = 0; i < data.length; i++) {
			//data[i]

			formattedData.push(
				//for red half
				{
					matchNumber: data[i].matchNumber,
					teams: [data[i].teams.red1, data[i].teams.red2],
					score:{
						auto: data[i].score.auto.red,
						driver: data[i].score.driver.red,
						end: data[i].score.end.red,
						total: data[i].score.total.red,
						penalty: data[i].score.penalty.red,
						final: data[i].score.final.red
					},
				},
				//for blue half
				{
					matchNumber: data[i].matchNumber,
					teams: [data[i].teams.blue1, data[i].teams.blue2],
					score:{
						auto: data[i].score.auto.blue,
						driver: data[i].score.driver.blue,
						end: data[i].score.end.blue,
						total: data[i].score.total.blue,
						penalty: data[i].score.penalty.blue,
						final: data[i].score.final.blue
					}
				}
			)
		}

		return formattedData
	}
}







