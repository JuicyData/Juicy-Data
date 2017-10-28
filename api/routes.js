var MongoClient = require('mongodb').MongoClient
var url = "mongodb://localhost:27017/TheOrangeAlliance";
// var configDB = require('./../config/database.js')
module.exports = function(app) {
	app.get('/api', function(req, res) {
		res.send('api home')
	})

	app.post('/api/insert-gamedata', function(req, res) {
		MongoClient.connect(url, function(err, db) {
			if (err) {
				res.status(500).send(err)
			} else {
				db.collection("gameData").insertOne(req.body, function(err, result) {
					if (err) {
						res.status(500).send(err)
					} else {
						console.log("Game Data Inserted");
						db.close();	
					}
				});
			}
		});
	})
}