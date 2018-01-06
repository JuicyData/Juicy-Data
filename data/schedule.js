// Test schedule for https://theorangealliance.org/events/1718-NCAL-RWC
db.schedules.insert({
  _id:{
    name: 'Redwood City FTC QT',
    date: '2017-11-04T07:00:00.000Z',
    locationID: 'Lol..' //should be object Id
  },
  schedule: [
    {
      matchNumber: 1,
      teams: {
        red1: 13215,
        red2: 13219,
        blue1: 9914,
        blue2: 7390
      }
    },
    {
      matchNumber: 2,
      teams: {
        red1: 13218,
        red2: 11689,
        blue1: 5214,
        blue2: 13216
      }
    },
    {
      matchNumber: 3,
      teams: {
        red1: 9784,
        red2: 13162,
        blue1: 6165,
        blue2: 13219
      }
    },
    {
      matchNumber: 4,
      teams: {
        red1: 7390,
        red2: 5214,
        blue1: 9784,
        blue2: 13216
      }
    },
    {
      matchNumber: 5,
      teams: {
        red1: 13162,
        red2: 11689,
        blue1: 9914,
        blue2: 13218
      }
    },
    {
      matchNumber: 6,
      teams: {
        red1: 6165,
        red2: 11689,
        blue1: 13215,
        blue2: 7390
      }
    },
    {
      matchNumber: 7,
      teams: {
        red1: 13216,
        red2: 13215,
        blue1: 13162,
        blue2: 13219
      }
    },
    {
      matchNumber: 8,
      teams: {
        red1: 9914,
        red2: 6165,
        blue1: 13218,
        blue2: 5214
      }
    },
    {
      matchNumber: 9,
      teams: {
        red1: 9784,
        red2: 7390,
        blue1: 13162,
        blue2: 9914
      }
    },
    {
      matchNumber: 10,
      teams: {
        red1: 11689,
        red2: 5214,
        blue1: 13219,
        blue2: 9784
      }
    },
    {
      matchNumber: 11,
      teams: {
        red1: 13218,
        red2: 13216,
        blue1: 13215,
        blue2: 6165
      }
    },
    {
      matchNumber: 12,
      teams: {
        red1: 13218,
        red2: 13215,
        blue1: 9784,
        blue2: 5214
      }
    },
    {
      matchNumber: 13,
      teams: {
        red1: 13162,
        red2: 6165,
        blue1: 11689,
        blue2: 13219
      }
    },
    {
      matchNumber: 14,
      teams: {
        red1: 9914,
        red2: 13216,
        blue1: 7390,
        blue2: 11689
      }
    },
    {
      matchNumber: 15,
      teams: {
        red1: 9914,
        red2: 9784,
        blue1: 13216,
        blue2: 6165
      }
    },
    {
      matchNumber: 16,
      teams: {
        red1: 13215,
        red2: 5214,
        blue1: 13162,
        blue2: 7390
      }
    },
    {
      matchNumber: 17,
      teams: {
        red1: 13219,
        red2: 7390,
        blue1: 13218,
        blue2: 9784
      }
    }
  ]
})
