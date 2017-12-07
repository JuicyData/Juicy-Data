var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/JuicyData";

module.exports = function() {
	generate()
}

function generate() {
	MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    locations = [
      {
        _id: 1,
        name: 'Francis Parker School',
        address: {
          number: 6501,
          street: 'Linda Vista Rd',
          zip: 9211,
          city: 'San Diego',
          state: 'CA',
          country: 'USA'
        }
      },
      {
        _id: 2,
        name: 'Escondido Charter High School',
        address: {
          number: 1868,
          street: 'E. Valley Pkwy',
          zip: 92027,
          city: 'Escondido',
          state: 'CA',
          country: 'USA'
        }
      },
      {
        _id: 3,
        name: 'R. Roger Rowe School',
        address: {
          number: 5927,
          street: 'La Granada',
          zip: 92067,
          city: 'Rancho Sante Fe',
          state: 'CA',
          country: 'USA'
        }
      }
    ]
    for(var i = 0; i < locations.length; i++ ){
      db.collection('locations').save(locations[i]);
    }
    events = [
      {
        _id:{
          name: 'Descartes League Meet #1',
          date: new Date('12/09/17'),
          locationID: 1
        },
        eventInformation: {
          eventName: 'Descartes League Meet #1',
          locationName: 'Francis Parker School',
          teamsList: [3848,4262,5131,5135,8097,9261,9266,10092,10390,10793,10809,11285,11350,11656,12765],
          season: '1718'
        }
      },
      {
        _id:{
          name: 'Euclid League Meet #1',
          date: new Date('12/10/17'),
          locationID: 2
        },
        eventInformation: {
          eventName: 'Euclid League Meet #1',
          locationName: 'Escondido Charter High School',
          teamsList: [4278,5540,6003,7159,7609,9441,9873,11128,12073,12666,12778,13084,13098,13145,13202,13184],
          season: '1718'
        }
      },
      {
        _id:{
          name: 'Gauss League Meet #1',
          date: new Date('12/09/17'),
          locationID: 3
        },
        eventInformation: {
          eventName: 'Gauss League Meet #1',
          locationName: 'R. Roger Rowe School',
          teamsList: [5015,6016,6226,7696,8605,8606,9049,9164,9892,11411,12605,12748,13185,13224,13383,13891],
          season: '1718'
        }
      },
      {
        _id:{
          name: 'Turing League Meet #1',
          date: new Date('12/09/17'),
          locationID: 2
        },
        eventInformation: {
          eventName: 'Turing League Meet #1',
          locationName: 'Escondido Charter High School',
          teamsList: [2885,3650,4216,6074,8380,8742,8906,9367,9902,11212,11288,11938,12405,12499,12823,12406],
          season: '1718'
        }
      }
    ]
    for(var i = 0; i < events.length; i++ ){
      db.collection('events').save(events[i]);
    }
  });
}
