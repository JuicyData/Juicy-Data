var express  = require('express');
var app      = express();
const path = require('path');
var port     = process.env.PORT || 3000;
var mongoose = require('mongoose');

var morgan       = require('morgan');
var bodyParser   = require('body-parser');

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

require('./api/routes.js')(app); // load our routes and pass in our app and fully configured passport

app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// require('./data/locationsAndEvents.js')()
require('./api/locationsAndEventsAndSchedules.js')()
require('./api/matchAndGameData.js')()

app.listen(port);
console.log('Server started on port ' + port);
