//algorithms by Michael Leonffu
var juicyCalculator = require('./juicyCalculator')
var calculatedAverageSimple = require('./calculatedAverageSimple')
var misc = require('./misc')

var algorithmLoader = function(algorithmName, eventData, query){
	if(algorithmName === 'simpleOPR'){
		return calculatedAverageSimple.OPR(eventData, query)
	}
	// if(algorithmName === 'CCWM'){
	// 	return calculatedAverageSimple.CCWM(eventData, query)
	// }
	if(algorithmName === 'random'){
		return misc.random(eventData, query)
	}
	// if(algorithmName === 'null'){
	// 	return misc.null(eventData, query)
	// }
	return -1
}

module.exports = {
	juicyCalculator: juicyCalculator,
	calculatedAverageSimple: calculatedAverageSimple,
	misc: misc,
	algorithmLoader: algorithmLoader
}
// To use in another file:
// var algorithms = require('./algorithms')