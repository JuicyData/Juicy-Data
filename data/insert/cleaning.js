//cleaning.js by Michael Leonffu
var MongoClient = require('mongodb').MongoClient
var configDB = require('./../config/database.js')
ObjectID = require('monogdb').ObjectID

//Supposed to clean the old TheOrangeAlliance and aggregate it to make the new schema.

module.exports = function(app) {

function cleanScheduleInput(){
	MongoClient.connect('mongodb://localhost/TheOrangeAllianceTest', function(err,db){
		//If trhere is an error while connecting to the database
		if(err){
			console.log(err)
			return
		}
		//Looks for the document MetaData.MetaData: 'ScheduleInput' in the turing collection
		db.collection('turing').findOne({'MetaData.MetaData':'ScheduleInput'},scheduleInputInterpert)

		//Callback; the function that runs after the dataase gives a responce
		function scheduleInputInterpert(err, doc){
			if(err){
				console.log(err)
				//normally add a db.close() here but this is not going to run on a API server
			}else{
				//If threre are no errors then:

				console.log('doc: ', doc)

			}
		}


	})
}

}