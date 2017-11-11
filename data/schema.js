//in collection 'gameData'
{
	matchInformation:{
		matchDate: ISODate(), //ISO Date of when it occured; 
		matchLocationID: OjectId(), //ID of the location in the 'places' collection
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

//in collection 'schedule'
{
	matchInformation:{
		matchDate: ISODate(), //ISO Date of when it occured; 
		matchLocationID: OjectId(), //ID of the location in the 'places' collection
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

//in collection 'matchData'
{
	matchInformation:{
		matchDate: ISODate(), //ISO Date of when it occured; 
		matchLocationID: OjectId(), //ID of the location in the 'places' collection
		matchNumber: 123,
	},
	resultInformation:{
		winner: 'abc', //'blue', 'red', 'tie'
		score:{
			auto:{
				red: 123, //red alliance autonomous score
				blue: 123 //blue alliance autonomous score
			},
			tele:{
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