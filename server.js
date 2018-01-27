var express  = require('express');
var app      = express();
const path = require('path');
var port     = process.env.PORT || 3000;

var morgan       = require('morgan');
var bodyParser   = require('body-parser');

var MongoClient = require('mongodb').MongoClient
var configDB = require('./config/database')
var ObjectId = require('mongodb').ObjectID


app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

MongoClient.connect(configDB.url, function(err,client){
	if(err){
		console.log(err)
		return
	}else{
		require('./api/api')(app, client.db('JuicyData'), ObjectId); // load our routes and pass in our app
	}
})

// let eventKeys = ['1718-CASD-SCHS2']
// require('./api/orangeFarm/locationsAndEventsAndSchedules.js')(eventKeys, function() {
// 	require('./api/orangeFarm/initializeMatchData.js')(eventKeys, function() {/*callback*/})
// })
// require('./api/orangeFarm/matchAndGameData.js')(['1718-CASD-SCHS2'], function() {/*callback*/})

// app.use(express.static(path.join(__dirname, 'dist')));
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist/index.html'));
// });

app.listen(port);
console.log('Server started on port ' + port);
