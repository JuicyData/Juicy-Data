//orangeFarm by Michael Leonffu

/*
Runs all the peeling scripts with the correct juicyCalculator scripts

Input is the event to take care of (the orange orcherd)

It finds the orangePicker to pick the correct oranges,
then it sends the oranges to the peelers,
the peeled oranges are finally sent to the juicyCalculators to produce juicy data,
which is sold by the orange stand
*/

// 123456789 123456789 123456789 12345 123456789 123456789 12345 123456789 123456789 123456789 123456789
// [blank	] [file   ] [method ] [sta] [log   		      ] [sta] [file   ] [method ] [log   		    ]
			
// Start Start
// Done  Done
// [Log] Log
// [Err] Error
// [Wrn] Warning
//https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
//https://stackoverflow.com/questions/19837697/node-js-formatted-console-output

function orangeFarm(mongodb, orchard, farmReport){

	var orangePicker = require('./orangePicker')(mongodb)
	var orangePeeler = require('./orangePeeler')
	var algorithms = require('./../algorithms/algorithms')
	var orangeStand = require('./orangeStand')

	//MAYBE ADD A ORCHARD CHECKER HERE!; though manager should know if it exsists or not anyways

	// orchard should be in this form of a TOA event key as a string 

	//I know this is a nested callbacks but its really cool looking rn
	console.log('[START]-orangeFarm')
	var farmTimer = new Date()
	orangePicker.orangePickerRanking(orchard, function(pickedRankingOranges){
	orangePicker.orangePickerAverageScores(orchard, function(pickedAvergeScoresOranges){
	orangePicker.orangePickerMatchHistory(orchard, function(pickedMatchHistoryOranges){
	orangePicker.orangePickerOrchard(orchard, function(pickedOrchardOranges){
		orangePeeler.teamInfluencePeeler(pickedAvergeScoresOranges, function(peeledOranges){
			algorithms.juicyCalculator(peeledOranges, function(calculatedJuice){
				//console.log('calculatedJuice', calculatedJuice)
				orangeStand(mongodb, orchard, pickedRankingOranges, pickedMatchHistoryOranges, calculatedJuice, pickedOrchardOranges, function(report){
					console.log('Operation orangeFarm time(Milliseconds):',new Date(new Date()-farmTimer).getMilliseconds())	//Timmer doens't seem to acually work?
					console.log('[DONE]-orangeFarm')
					farmReport(report) //This is done
				})
			}, true, 2) //Toggle for the console logs in juicyCalculator; 1 is for 1 place after decmiel
		})
	})
	})
	})
	})
}

module.exports = orangeFarm

// To use in another file:
// var orangeFarm = require('./orangeFarm')
// orangeFarm(orchard, farmReport)
// Where farmReport is the callback function returning a string, if sucsessful or not