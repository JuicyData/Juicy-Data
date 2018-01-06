var MongoClient = require('mongodb').MongoClient
var configDB = require('./../config/database.js')
ObjectId = require('mongodb').ObjectID
module.exports = function(app) {
//require('./module')(app) This is the example; template IF THERE ARE MORE APIs
app.get('/api', function(req, res) {
	res.send('api home')
})

app.get('/api/events/read', (req, res) =>{
	MongoClient.connect(configDB.url, function(err,db){
		if(err){
			console.log(err)
			res.status(500).send(err)
			return
		}
		
		db.collection('eventOut').findOne(
			{
				_id: req.query.eventId
			},
			function(err, eventDoc){
				if(err){
					console.log(err)
					res.status(500).send(err)
					db.close()
					return
				}else{
					if(eventDoc){ //NEED TO TEST THIS
						res.json(eventDoc)
						db.close()
					}else{		// if threre is no documents returned then:
						res.status(400).send('Event not found')
						db.close()
					}
				}
			}
		)
	})
})

}