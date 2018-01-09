//manager by Michael Leonffu

// This is the main script that'll run all the other scripts. This is what you'd call manager.js
// This script checks what to do (which events to update) and how to do them.
// This will also be a hub

var MongoClient = require('mongodb').MongoClient
var configDB = require('./../config/database')
var ObjectId = require('mongodb').ObjectID
//var apiKey = require('./../config/apiKey')

module.exports = {}

// require('./orangeFarm/matchAndGameData.js')()
// require('./orangeFarm/locationsAndEventsAndSchedules.js')()

MongoClient.connect(configDB.url, function(err,db){
	if(err){
		console.log(err)
		res.status(500).send(err)
		return
	}else{

		var orangeFarm = require('./orangeFarm/orangeFarm') // load our routes and pass in our app
		// orangeFarm({db:db, ObjectId:ObjectId}, '1718-NCAL-RWC', function(farmReport){
		// 	console.log(farmReport)
		// 	db.close()
		// })

		var orchardList = [
			'1718-NCAL-RWC',

			'1718-FIM-CMP1',	//team 5386
			'1718-FIM-MARY',
			'1718-FIM-GLBR'
		]

		for (var i = 0; i < orchardList.length; i++) {
			//orchardList[i]
			orangeFarm({db:db, ObjectId:ObjectId}, orchardList[i], function(farmReport){
				console.log('farmReport:', farmReport)
			})
		}
	}
})
