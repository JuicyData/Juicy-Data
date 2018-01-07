//orangeFarm by Michael Leonffu

var orangePicker = require('./orangePicker')
var orangePeeler = require('./orangePeeler')
var juicyCalculator = require('./juicyCalculator')
var orangeStand = require('./orangeStand')


/*
Runs all the peeling scripts with the correct juicyCalculator scripts

Input is the event to take care of (the orange orcherd)

It finds the orangePicker to pick the correct oranges,
then it sends the oranges to the peelers,
the peeled oranges are finally sent to the juicyCalculators to produce juicy data,
which is sold by the orange stand
*/

function orangeFarm(orchard, farmReport){
	//MAYBE ADD A ORCHARD CHECKER HERE!; though manager should know if it exsists or not anyways

	// orchard should be in this form:
	// {
	// 	name: 'abc',
	// 	date: ISODate(), //ISO Date of when it occured; 
	// 	locationID: ObjectId() //ID of the location in the 'places' collection
	// }

	//I know this is a nested callbacks but its really cool looking rn
	console.log('[START]-orangeFarm')
	var farmTimer = new Date()
	orangePicker.orangePickerRanking(orchard, function(pickedRankingOranges){
	orangePicker.orangePickerAverageScores(orchard, function(pickedAvergeScoresOranges){
	orangePicker.orangePickerMatchHistory(orchard, function(pickedMatchHistoryOranges){
		orangePeeler.teamInfluencePeeler(pickedAvergeScoresOranges, function(peeledOranges){
			juicyCalculator(peeledOranges, function(calculatedJuice){
				var calculatedJuice = {
					calculatedOffensiveJuice: calculatedJuice.offensiveOranges,
					calculatedMarginalJuice: calculatedJuice.marginalOranges
				}
				orangeStand.orangeStand(orchard, pickedRankingOranges, pickedMatchHistoryOranges, calculatedJuice, function(report){
					console.log('Operation orangeFarm time(Milliseconds):',new Date(new Date()-farmTimer).getMilliseconds())
					console.log('[DONE]-orangeFarm')
					farmReport(report) //This is done
				})
			}, true) //Toggle for the console logs in juicyCalculator
		})
	})
	})
	})

}

var orchard = '1718-NCAL-RWC'

orangeFarm(orchard, function(farmReport){
	console.log('farmReport',farmReport)
})

module.exports = {
	orangeFarm: orangeFarm
}
// To use in another file:
// var orangeFarm = require('./orangeFarm')
// orangeFarm(orchard, farmReport)
// Where farmReport is the callback function returning a string, if sucsessful or not