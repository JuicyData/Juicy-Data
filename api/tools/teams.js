//teams by Michael Leonffu
var MongoClient = require('mongodb').MongoClient	//CHANGE
var url = "mongodb://localhost:27017/JuicyData"	//CHANGE

var apiKey = require('../../config/apiKey.js')
var axios = require('axios')
var toaApi = axios.create({
	baseURL: 'http://theorangealliance.org/apiv2/',
	timeout: 10000,
	headers: {'X-Application-Origin': 'JuicyData', 'X-TOA-Key': apiKey}
})

//Generates the teams collection using TOAs database
//Pulls the complete teams collection then compares it to TOAs database;
//if threre is a differnce then the TOA version is saved
//BUT ACUALLY now it just drops the collection and reinserts it all

toaApi.get('/teams').then(function(response) {
	var teamsList = []
	for (var i = 0; i < response.data.length; i++) {
		//console.log(response.data[i].event_key)
		teamsList[i] = response.data[i]
		teamsList[i]._id = response.data[i].team_number
	}
	console.log('teamsList',teamsList)
	MongoClient.connect(url, function(err, db) {
		if (err) throw err
		db.collection('teams').insertMany(
			teamsList,
			function(err, responce){
				if(err){
					console.log(err),
					db.close()
				}else{
					console.log(responce)
					db.close()
				}
			}
		)
	})
})
