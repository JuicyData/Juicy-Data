var express  = require('express');
var app      = express();
const path = require('path');
var port     = process.env.PORT || 3000;
var mongoose = require('mongoose');

var morgan       = require('morgan');
var bodyParser   = require('body-parser');

var MongoClient = require('mongodb').MongoClient
var configDB = require('./config/database')
var ObjectId = require('mongodb').ObjectID

mongoose.connection.openUri("mongodb://localhost/TheOrangeAlliance")
  .once('open', () => console.log('Connected to database'))
  .on('error', (error) => {
    console.warn('Database warning', error);
  });

app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

MongoClient.connect(configDB.url, function(err,db){
	if(err){
		console.log(err)
		res.status(500).send(err)
		return
	}else{
		require('./api/api')(app, db, ObjectId); // load our routes and pass in our app
	}
})

require('./api/orangeFarm/matchAndGameData.js')()
require('./api/orangeFarm/locationsAndEventsAndSchedules.js')()

// app.use(express.static(path.join(__dirname, 'dist')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist/index.html'));
// });

app.listen(port);
console.log('Server started on port ' + port);
