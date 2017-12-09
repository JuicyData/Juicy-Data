//in collection 'gameData'
{
	_id:{
		eventInformation:{
			name: 'abc',
			date: ISODate(), //ISO Date of when it occured; 
			locationID: ObjectId() //ID of the location in the 'places' collection
		},
		matchInformation:{
			matchNumber: 123,
			robotAlliance: 'abc', //blue or red; with lower case
			teams: [123, 123]
		}
	}
	gameInformation:{	//CHECK IF ALL THSES TYPES ARE CORRECT AND ALSO HAVE COFRRECT MEANING!
		auto:{
			jewel: 123,
			glyphs: 123,
			keys: 123,
			park: 123
		},
		driver:{
			glyphs: 123,
			rows: 123,
			collumns: 123,
			cypher: 123
		},
		end:{
			relic1: 123,	//Amount of relics in that zone
			relic2: 123,
			relic3: 123,
			relicsUp: 123,	//Amount of relects standing up
			balanced: 123	//How many robots are balanced
		}
	}
}

//in collection 'schedules'
{
	_id:{	//Maybe unnest this latter....
		eventInformation:{
			name: 'abc',
			date: ISODate(), //ISO Date of when it occured; 
			locationID: ObjectId(), //ID of the location in the 'places' collection
		}
	},
	schedule:[ //Aray of JSON
		{
			matchNumber: 123, //Match Number
			teams:{
				red1: 123, //Team Number
				red2: 123,
				blue1: 123,
				blue2: 123,
			}
		}
	]
}

// teams:{	//NOT SURE IF WE ACUALLY NEED THIS; WE HAVE SCHEDULE WHICH SHOULD BE A MATCH OF THIS
// 	red1: {
// 		teamNumber: 123,
// 		surrogate: false	//True if this team was surrgogate
// 	},
// 	red2: {
// 		teamNumber: 123,
// 		surrogate: false
// 	},
// 	blue1: {
// 		teamNumber: 123,
// 		surrogate: false
// 	},
// 	blue2: {
// 		teamNumber: 123,
// 		surrogate: false
// 	}
// }

//in collection 'matchData'
{
	_id:{
		eventInformation:{
			name: 'abc',
			date: ISODate(), //ISO Date of when it occured; 
			locationID: ObjectId() //ID of the location in the 'places' collection
		}
		matchInformation:{
			matchNumber: 123,
			teams:{	//NOT SURE IF WE ACUALLY NEED THIS; WE HAVE SCHEDULE WHICH SHOULD BE A MATCH OF THIS
				red1: 123,
				red2: 123,
				blue1: 123,
				blue2: 123
			}
		}
	},
	resultInformation:{
		winner: 'abc', //'blue', 'red', 'tie'
		score:{
			// red:{	//This may be better way but for now I'm leaving it the 'old' way
			// 	auto: 123,
			// 	driver: 123,
			// 	end: 123,
			// 	total: 123,
			// 	penalty: 123,
			// 	final: 123
			// },
			// blue:{
			// 	auto: 123,
			// 	driver: 123,
			// 	end: 123,
			// 	total: 123,
			// 	penalty: 123,
			// 	final: 123
			// },
			auto:{
				red: 123, //red alliance autonomous score
				blue: 123 //blue alliance autonomous score
			},
			driver:{
				red: 123, //red alliance tele-op score
				blue: 123 //blue alliance tele-op score
			},
			end:{
				red: 123, //red alliance end-game score
				blue: 123 //blue alliance end-game score
			},
			total:{
				red: 123, //red alliance total score
				blue: 123 //blue alliance total score
			},
			penalty:{
				red: 123, //red alliance penalty score
				blue: 123 //blue alliance penalty score
			},
			final:{
				red: 123, //red alliance final score
				blue: 123 //blue alliance final score
			}
		}
	}
}

//in collection 'events'
{
	_id:{	//This MUST be unique?? This is Date Place; There shouldn't be another DATEPLACE the same event (Thats the idea...)
		name: 'abc', //This is the name of the event ex. 'turing league'
		date: ISODate(), //ISO Date of when it occured; 
		locationID: ObjectId() //ID of the location in the 'places' collection
	}
	eventInformation:{
		eventName: 'abc',
		locationName: 'abc',	//Same as the name in the locations collection
		teamsList:[123, 123, 123],
		season: 123, //for relic recovery 2017-2018 the yeah is 2017
		toaEventKey: 'abc' //Event string for toa for this event
	}
}

//in collection 'locations'
{
	_id: ObjectId(),	//This is the id of the location
	name: 'abc',		//Name of the location exmaple: Sage Creek High School
	address:{			//if value is missing, use null
		number: 123,	//Address number?
		street: 'abc',	//Street
		zip: 123,		//Postal Zip
		city: 'abc',	//City
		state: 'abc',	//State
		country: 'abc'	//United States
	}
}

//in collection 'eventOut' INCOMPLETE
{
	eventInformation:{
		name: 'abc',
		date: ISODate(), //ISO Date of when it occured; 
		locationID: ObjectId() //ID of the location in the 'places' collection
	},
	lastUpdated: ISODate(), //Time of insert/update
	ranking:[
		{
			rank: 123,
			teamNumber: 123,
			teamName: 123,
			record:{
				wins: 123,
				losses: 123,
				ties: 123
			},
			qualifyingPoints: 123,
			rankingPoints: 123,
			averageScore: .123,
			averageMarginalScore: .123,
			average:{
				auto: .123,
				driver: .123,
				end: .123
			}
		}
	],
	matchHistory:[
		{
			matchNumber: 123,
			alliance: 'abc', //blue or red; lower case
			team1:{
				teamNumber: 123,
				teamName: 'abc',
				rank: 123
			},
			team2:{
				teamNumber: 123,
				teamName: 'abc',
				rank: 123
			},
			result:{
				total: 123,
				penalty: 123,
				final: 123
			},
			prediction: 'abc', //Which alliance will win; CHANGE THIS SCHEMA LATTER!!!!!
			gameInformation:{	//CHECK IF ALL THSES TYPES ARE CORRECT AND ALSO HAVE COFRRECT MEANING!
				auto:{
					jewel: 123,
					glyphs: 123,
					keys: 123,
					park: 123
				},
				driver:{
					glyphs: 123,
					rows: 123,
					collumns: 123,
					cypher: 123
				},
				end:{
					relic1: 123,	//Amount of relics in that zone
					relic2: 123,
					relic3: 123,
					relicsUp: 123,	//Amount of relects standing up
					balanced: 123	//How many robots are balanced
				}
			}
		}
	],
	averageScores:[
		{
			teamNumber: 123,
			teamName: 'abc',
			averageScore: .123,
			averageMarginalScore: .123,
			average:{
				auto: .123,
				driver: .123,
				end: .123
			},
			gameAverages:{	//CHECK IF ALL THSES TYPES ARE CORRECT AND ALSO HAVE COFRRECT MEANING! This is the calculated averages of each game element
				auto:{
					jewel: .123,
					glyphs: .123,
					keys: .123,
					park: .123
				},
				driver:{
					glyphs: .123,
					rows: .123,
					collumns: .123,
					cypher: .123
				},
				end:{
					relic1: .123,	//Amount of relics in that zone
					relic2: .123,
					relic3: .123,
					relicsUp: .123,	//Amount of relects standing up
					balanced: .123	//How many robots are balanced
				}
			}
		}
	]
}

//in collection 'gameData' OLD DO NOT USE
{
	eventInformation:{
		name: 'abc',
		date: ISODate(), //ISO Date of when it occured; 
		locationID: ObjectId() //ID of the location in the 'places' collection
	},
	matchInformation:{
		matchNumber: 123,
		robotAlliance: 'abc', //"blue" or "red"
		teamNumber: 123
	},
	gameInformation:{
		auto:{
			jewel: true, //True if score is gained?
			robotParking: true, //True if in safe zone
			cryptobox1:{
				glyphs: 123, //How many glyphs got scored in AUTO
				key: true //If correct key; and gained bonus
			}
			cryptobox2:{
				glyphs: 123, //How many glyphs got scored in AUTO
				key: true //If correct key; and gained bonus
			}
		},
		end:{
			relic1: { //If robot scored a relic; include field always
				zone: 123, //Zone 0 if not scored
				upright: true, //true if upright
			},
			relic2: { //If the robot scored two relics
				zone: 123,
				upright: true
			},
			robotBalanced: true, //True if balanced
			cryptobox1:{
				rows: 123, //Rows completed
				columns: 123, //Columns completed
				cipher: true, //If cipher was completed
				glyphs: 123, //How many glyphs got scored in AUTO
				key: true //If correct key; and gained bonus
			},
			cryptobox2:{
				rows: 123, //Rows completed
				columns: 123, //Columns completed
				cipher: true, //If cipher was completed
				glyphs: 123, //How many glyphs got scored in AUTO
				key: true //If correct key; and gained bonus
			}
		}
	}
}