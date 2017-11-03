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
		acualDatePlace: ''
	},
	{
		event: 'Euclid League Championship',
		location: 'Boys and Girls Club',
		locationId: 1,
		date: '2017 02 04',
		corrispondingDatePlace: 'Y201702041',
		acualDatePlace: ''
	},
	{
		event: 'Gauss League Championship',
		location: 'Tri-City Christian',
		locationId: 3,
		date: '2017 02 04',
		corrispondingDatePlace: 'Y201702043',
		acualDatePlace: ''
	},
	{
		event: 'Descartes League Championship',
		location: 'Grauer School',
		locationId: 4,
		date: '2017 02 04',
		corrispondingDatePlace: 'Y201702044',
		acualDatePlace: ''
	}
]

datePlaces = [
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
	{
		datePlace: 'Y201701211',
		valid: ,
		reason: ''
	},
	{
		datePlace: 'Y201701211Final',
		valid: ,
		reason: ''
	},
	{
		datePlace: 'Y201702041',
		valid: ,
		reason: ''
	},
	{
		datePlace: 'Y201702042',
		valid: ,
		reason: ''
	},
	{
		datePlace: 'Y201702043',
		valid: ,
		reason: ''
	},
	{
		datePlace: 'Y201702044',
		valid: ,
		reason: ''
	},
	{
		datePlace: 'Y20170204ERROR',
		valid: ?,
		reason: 'It is incomplete... not sure if it has valid data... will look into latter.'
	},
	{
		datePlace: 'Y201702051',
		valid: ,
		reason: ''
	},
	{
		datePlace: 'Y201702052',
		valid: ,
		reason: ''
	},
	{
		datePlace: 'Y201702053',
		valid: ,
		reason: ''
	}
]