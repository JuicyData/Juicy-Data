//cleaning by Michael Leonffu
var MongoClient = require('mongodb').MongoClient
ObjectId = require('mongodb').ObjectID

var juicyCalculator = require('./juicyCalculator')
//Supposed to clean the old TheOrangeAlliance and aggregate it to make the new schema.

//This cleans the ScheduleInput Data 
function cleanScheduleInput(collection){
	console.log('[START]-cleanScheduleInput')
	MongoClient.connect('mongodb://localhost/TheOrangeAllianceTest', function(err,db){
		//If there is an error while connecting to the database
		if(err){
			console.log(err)
			return
		}
		//Looks for the document MetaData.MetaData: 'ScheduleInput' in the turing collection
		db.collection(collection).findOne({'MetaData.MetaData':'ScheduleInput'},scheduleInputInterpert)

		//Callback; the function that runs after the dataase gives a responce
		function scheduleInputInterpert(err, doc){
			if(err){
				console.log(err)
				db.close()
			}else{
				//If threre are no errors then:
				//The doc is in the form of
				// doc = {
				// 	Match: {
				// 		Match1: {
				// 			Red1: 123, Red2: 123, Blue1: 123, Blue2: 123
				// 		}...
				// 	}
				// }

				var correctScheduleInput = {
					schedule: []
				}

				//This is not an array of JSON but just a JSON; Do not asume known amount of Matches
				for (var i = 1; i > 0; i++) {
					if(doc.Match['Match'+i]){
						//If a valid match that exsists is found
						var schedule = {
							match: i,
							teams:{
								red1: doc.Match['Match'+i].Red1,
								red2: doc.Match['Match'+i].Red2,
								blue1: doc.Match['Match'+i].Blue1,
								blue2: doc.Match['Match'+i].Blue2
							}
						}
						correctScheduleInput.schedule.push(schedule)
					}else{
						//If i isn't a match
						console.log('Last match number: ',i-1)
						i = -012199
					}
				}
				//returns it as 
				// {
				// 	schedule:[
				// 		{
				// 			match:1,
				// 			teams:{red1:123,red2:123,blue1:123,blue2:123}
				// 		},
				// 	]
				// }

				//This is just for schema; acual data isn't real
				correctScheduleInput.matchInformation = {
					matchDate: new Date(),
					matchLocationID: ObjectId('000000000000000000000000')
				}

				console.log('correctScheduleInput',correctScheduleInput)
				correctScheduleInput._id = 'Anna Li'
				db.collection('schedule'+collection).save(correctScheduleInput)
				db.close()
				console.log('[DONE]-cleanScheduleInput')
			}
		}
	})
}

//This cleans the ResultsInput Data; ResultsInput is now called matchData
function cleanMatchData(collection){
	console.log('[START]-cleanMatchData')
	MongoClient.connect('mongodb://localhost/TheOrangeAllianceTest', function(err,db){
		//If there is an error while connecting to the database
		if(err){
			console.log(err)
			return
		}

		//Looks for the document MetaData.MetaData: 'ScheduleInput' in the turing collection
		db.collection(collection).aggregate([
			{$match:{'MetaData.MetaData':'ResultsInput'}},
			{$project:{
				'matchInformation.matchNumber':'$MatchNumber',
				'resultsInformation':{
					winner:{$switch:{
						branches:[
							{case:{$eq:['$Winner','Red']},then:'red'},
							{case:{$eq:['$Winner','Blue']},then:'blue'},
							{case:{$eq:['$Winner','Tie']},then:'tie'}
						],
						default: 'BADCASE'
					}},
					score:{
						total:{red:'$Score.Total.Red',blue:'$Score.Total.Blue'},
						penalty:{red:'$Score.Penalty.Red',blue:'$Score.Penalty.Blue'},
						final:{red:'$Score.Final.Red',blue:'$Score.Final.Blue'}
					}
				}
			}}
		],cleanedMatchData)

		//Callback; the function that runs after the dataase gives a responce
		function cleanedMatchData(err, docs){
			if(err){
				console.log(err)
				db.close()
			}else{

				//This is just for schema; acual data isn't real
				for (var i = docs.length - 1; i >= 0; i--) {
					docs[i]._id = 'Anna Li'+String(i+1)
					docs[i].matchInformation.matchLocationID = ObjectId('000000000000000000000000')
					docs[i].matchInformation.matchDate = new Date()
					db.collection('matchData'+collection).save(docs[i])
				}

				console.log('Corrected Docs: ',docs)
				db.close()
				console.log('[DONE]-cleanMatchData')
			}
		}
	})
}

cleanScheduleInput('euclid')
cleanMatchData('euclid')