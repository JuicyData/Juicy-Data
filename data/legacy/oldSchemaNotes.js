//Interperting the old 2016-2017

placesListed = [
	{
		id: 1,
		place: '2230 E Jewett St, San Diego, CA 92111',
		location: 'Boys and Girls Club'
	},
	{
		id: 2,
		place: '1615 Mater Dei Dr, Chula Vista, CA 91913',
		location: 'Mater Dei HighSchool'
	},
	{
		id: 3,
		place: '302 Emerald Dr, Vista, CA 92083',
		location: 'Tri-City Christian'
	},
	{
		id: 4,
		place: '1500 S El Camino Real, Encinitas, CA 92024',
		location: 'Grauer School'
	},
	{
		id: 5,
		place: '6501 Linda Vista Rd, San Diego, CA 92111',
		location: 'Francis Parker School'
	}
]

events = [
	{
		event: 'San Diego Regional Championship',
		location: 'Francis Parker School',
		locationId: 5,
		date: '2017 02 25',
		corrispondingDatePlace: 'Y201702255',
		acualDatePlace: ''
	},
	{
		event: 'Turing League Championship',
		location: 'Mater Dei HighSchool',
		locationId: 2,
		date: '2017 02 05',
		corrispondingDatePlace: 'Y201702052',
		acualDatePlace: 'Y201702052'
	},
	{
		event: 'Euclid League Championship',
		location: 'Boys and Girls Club',
		locationId: 1,
		date: '2017 02 04',
		corrispondingDatePlace: 'Y201702041',
		acualDatePlace: 'Y201702041'
	},
	{
		event: 'Gauss League Championship',
		location: 'Tri-City Christian',
		locationId: 3,
		date: '2017 02 04',
		corrispondingDatePlace: 'Y201702043',
		acualDatePlace: 'Y201702043'
	},
	{
		event: 'Descartes League Championship',
		location: 'Grauer School',
		locationId: 4,
		date: '2017 02 04',
		corrispondingDatePlace: 'Y201702044',
		acualDatePlace: 'Y201702044'
	}
]

datePlacesTest = [
	{
		datePlace: 'T000000000',
		valid: false,
		raeson: 'A team should not have OPR and no matches... it is either incomplete or fake data'
	},
	{
		datePlace: 'T20ERROR',
		valid: false,
		reason: 'It is just lots of zeros...'
	},
	{
		datePlace: 'Y1',
		valid: false,
		reason: 'There is a lot of zeros, though not all zeros'
	},
	{	//Time stamp is: Sat Jan 21 2017 09:03:56 GMT-0800 (PST)
		datePlace: 'Y201701211',
		valid: ?,
		reason: 'Need to check if this is correct or if Final is correct'
	},
	{	//Not sure to use this or the non Final version....
		datePlace: 'Y201701211Final',
		valid: ?,
		reason: 'Need to check if non final is correct or if this is correct'
	},
	{	//We were here for this one: Sat Feb 04 2017 10:31:29 GMT-0800 (PST)
		datePlace: 'Y201702041',
		valid: true,
		reason: 'Level up Attended this one; Cameron and I also where present to record Data'
	},
	{	//Data in the Y201702052 is Sun Feb 05 2017 12:30:46 (PST); 
		datePlace: 'Y201702042',
		valid: false,
		reason: 'This same data and date Sun Feb 05 2017 11:50:22 (PST), but differnt ObjectId as Y201702052'
		//CONCERN: Total: red 15, blue 65; penalty none; Final red 15, blue 66 (BLUE IS 66 SOMEHOW?!)
	},
	{	//Tue Feb 07 2017 23:45:57 GMT-0800 (PST) is the timstamp on one of the docs in there
		datePlace: 'Y201702043',
		valid: true,
		reason: 'Seems fine... We did not attend this league meet'
	},
	{	//Wed Feb 08 2017 00:28:04 GMT-0800 (PST) is the timestamp on one of the docs in there
		datePlace: 'Y201702044',
		valid: true,
		reason: 'Seems fine... We did not attend this league meet'
	},
	{
		datePlace: 'Y20170204ERROR',
		valid: ?,
		reason: 'It is incomplete... not sure if it has valid data... will look into latter.'
	},
	{	//REQUIRES ACTION; MOVE THE DATA IN THIS datePlace INTO THE ONE IN THE REASON Y201702052
		datePlace: 'Y201702051',
		valid: false,
		reason: 'It seems to have a valid document but in the wrong PLACE in datePlace... moving it to Y201702052'
	},
	{
		datePlace: 'Y201702052',
		valid: true,
		reason: 'We attended this one, I also checked it kinda...'
	},
	{	//MatchNumber 6, Winner Red, Total is Final: red 160, blue 45
		datePlace: 'Y201702053',
		valid: false,
		reason: 'This data seems wrong due to the date Tue Feb 07 2017 23:53:54 PST'
	},
]

datePlaces = [
	{
		datePlace: 'DataValidation',
		valid: ,
		reason: '',
	},
	{
		datePlace: 'Log',
		valid: ,
		reason: '',
	},
	{
		datePlace: 'Y201702255',
		valid: ,
		reason: '',
	},
	{
		datePlace: 'Y201702255Raw',
		valid: ,
		reason: '',
	},
	{
		datePlace: 'Y20ERROR',
		valid: ,
		reason: '',
	},
	{
		datePlace: 'Y20ERRORRaw',
		valid: ,
		reason: '',
	},
	{
		datePlace: 'Y20thebesttimeERRORRaw',
		valid: false,
		reason: 'Match Number 999, inputType Testing; this is fake data',
	},
	{
		//This is a schedule for soemthing... I need to figure out what it is for...
		datePlace: 'cameronshappyness',
		valid: false,
		reason: 'It is a schedule, its not acual data... It needs to be moved someplace and checked.',
	}
]