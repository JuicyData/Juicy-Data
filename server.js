const express = require('express');
const path = require('path');
var bodyParser = require('body-parser');

const app = express();

//The order of the following is important

app.use(bodyParser.json({ limit: '5mb' })); // support json encoded bodies

// Point to api.js, which will interact with the database.
const api = require('./server/routes/api');
app.use('/api', api);

// Point static path to the built Angular app. 
// Only used for production when we only want this server running and not ng serve.
// Otherwise ng serve is used and the app is on the port Angular is set to (4200)
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const port = 3000;
app.listen(port, () => console.log(`Server running on localhost:${port}`));