import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-sd-league-registration',
  templateUrl: './sd-league-registration.component.html',
  styleUrls: ['./sd-league-registration.component.css']
})
export class SdLeagueRegistrationComponent implements OnInit {
  // Contact Variables
  lastName1: string;
  firstName1: string;
  email1: string;
  phoneNumber1: any;
  lastName2: string;
  firstName2: string;
  email2: string;
  phoneNumber2: any;
  lastName3: string;
  firstName3: string;
  email3: string;
  phoneNumber3: any;
  contact2 = false;
  contact3 = false;

  // Team Social Variables
  teamFacebook: '';
  teamInstagram: '';
  teamTwitter: '';
  teamWebsite: '';
  teamEmail: any;
  logo: any;

  // Meet Pick Variables
  weekPick1: any;
  weekPick2: any;
  weekPick3: any;
  weekPick4: any;
  weekPick1Information: any;
  weekPick2Information: any;
  weekPick3Information: any;
  weekPick4Information: any;

  // Error Variables
  validationErrors = [];
  slotErrors = [];
  errors = [];

  registrationComplete = false;
  jwt: any;
  count = 1;
  helper = new JwtHelperService();
  optInEmail: any;
  doc: any;
  teamNumber: number;
  leagueInformation1: any;
  leagueInformation2: any;
  leagueInformation3: any;
  leagueInformation4: any;

  // leagueInformation1 = [
  //   {
  //     _id: '1819-CASDW1-DESCARTES-SDJA',
  //     leagueInfo: {
  //       location: 'San Diego Jewish Academy',
  //       address: '11860 Carmel Creek Rd, San Diego, CA 92130',
  //       date: 'December 9th, 2018',
  //       time: {
  //         start: '8:00AM',
  //         end: '12:00PM'
  //       },
  //       leagueName: 'Descartes',
  //       week: 1
  //     },
  //     slots: 0
  //   },
  //   {
  //     _id: '1819-CASDW1-TURING-SDJA',
  //     leagueInfo: {
  //       location: 'San Diego Jewish Academy',
  //       address: '11860 Carmel Creek Rd, San Diego, CA 92130',
  //       date: 'December 9th, 2018',
  //       time: {
  //         start: '1:00PM',
  //         end: '5:00PM'
  //       },
  //       leagueName: 'Turing',
  //       week: 1
  //     },
  //     slots: 0
  //   },
  //   {
  //     _id: '1819-CASDW1-GAUSS-RRRS',
  //     leagueInfo: {
  //       location: 'R. Roger Rowe School',
  //       address: '5927 La Granada, Rancho Santa Fe, CA 92067',
  //       date: 'December 8th, 2018',
  //       time: {
  //         start: '7:15AM',
  //         end: '1:00PM'
  //       },
  //       leagueName: 'Gauss',
  //       week: 1
  //     },
  //     slots: 0
  //   },
  //   {
  //     _id: '1819-CASDW1-PTOLOMY-FPHS',
  //     leagueInfo: {
  //       location: 'Francis Parker High School',
  //       address: '6501 Linda Vista Rd, San Diego, CA 92111',
  //       date: 'December 9th, 2018',
  //       time: {
  //         start: '7:30AM',
  //         end: '12:00PM'
  //       },
  //       leagueName: 'Ptolomy',
  //       week: 1
  //     },
  //     slots: 0
  //   },
  //   {
  //     _id: '1819-CASDW1-EUCLID-FPHS',
  //     leagueInfo: {
  //       location: 'Francis Parker High School',
  //       address: '6501 Linda Vista Rd, San Diego, CA 92111',
  //       date: 'December 9th, 2018',
  //       time: {
  //         start: '1:00PM',
  //         end: '5:30PM'
  //       },
  //       leagueName: 'Euclid',
  //       week: 1
  //     },
  //     slots: 0
  //   }
  // ];
  // leagueInformation2 = [
  //   {
  //     leagueInfo: {
  //       date: 'January 12th, 2019',
  //       location: 'R. Roger Rowe School',
  //       address: '5927 La Granada, Rancho Santa Fe, CA 92067',
  //       time: {
  //         start: '7:15AM',
  //         end: '1:00PM'
  //       },
  //       week: 2
  //     },
  //     _id: '1819-CASDW2-RR',
  //     slots: 0
  //   },
  //   {
  //     leagueInfo: {
  //       date: 'January 12th, 2019',
  //       location: 'Francis Parker High School',
  //       address: '6501 Linda Vista Road San Diego, CA 92111',
  //       time: {
  //         start: '7:30AM',
  //         end: '12:00PM'
  //       },
  //       week: 2
  //     },
  //     _id: '1819-CASDW2-RD',
  //     slots: 0
  //   },
  //   {
  //     leagueInfo: {
  //       date: 'January 12th, 2019',
  //       location: 'Design39 Campus - 1',
  //       address: '17050 Del Sur Ridge Road San Diego, CA 92127',
  //       time: {
  //         start: '1:00PM',
  //         end: '6:00PM'
  //       },
  //       week: 2
  //     },
  //     _id: '1819-CASDW2-D39-1',
  //     slots: 0
  //   },
  //   {
  //     leagueInfo: {
  //       date: 'January 12th, 2019',
  //       location: 'La Jolla Country Day',
  //       address: '9490 Genesee Ave, La Jolla, CA 92037',
  //       time: {
  //         start: '7:30AM',
  //         end: '12:00PM'
  //       },
  //       week: 2
  //     },
  //     _id: '1819-CASDW2-LJCD',
  //     slots: 0
  //   },
  //   {
  //     leagueInfo: {
  //       date: 'January 13th, 2019',
  //       location: 'Design39 Campus - 2',
  //       address: '17050 Del Sur Ridge Road San Diego, CA 92127',
  //       time: {
  //         start: '1:00PM',
  //         end: '6:00PM'
  //       },
  //       week: 2
  //     },
  //     _id: '1819-CASDW2-D39-2',
  //     slots: 0
  //   }
  // ];
  // leagueInformation3 = [
  //   {
  //     leagueInfo: {
  //       date: 'January 26th, 2019',
  //       location: 'The Grauer School',
  //       address: '1500 S El Camino Real, Encinitas, CA 92024',
  //       time: {
  //         start: '8:00AM',
  //         end: '12:00PM'
  //       },
  //       week: 3
  //     },
  //     _id: '1819-CASDW3-GRAUER',
  //     slots: 0
  //   },
  //   {
  //     leagueInfo: {
  //       date: 'January 26th, 2019',
  //       location: 'Sage Creek High School',
  //       address: '3900 Cannon Road, Carlsbad, CA 92010',
  //       time: {
  //         start: '8:00AM',
  //         end: '1:00PM'
  //       },
  //       week: 3
  //     },
  //     _id: '1819-CASDW3-SCHS',
  //     slots: 0
  //   },
  //   {
  //     leagueInfo: {
  //       date: 'January 26th, 2019',
  //       location: 'SET High',
  //       address: '3540 Aero Ct, San Diego, CA 92123',
  //       time: {
  //         start: '8:00AM',
  //         end: '12:00PM'
  //       },
  //       week: 3
  //     },
  //     _id: '1819-CASDW3-SET',
  //     slots: 0
  //   },
  //   {
  //     leagueInfo: {
  //       date: 'January 26th, 2019',
  //       location: 'Classical Academy Online',
  //       address: '130 Woodward Ave, Escondido, CA 92025',
  //       time: {
  //         start: '1:00PM',
  //         end: '5:00PM'
  //       },
  //       week: 3
  //     },
  //     _id: '1819-CASDW3-CAO',
  //     slots: 0
  //   },
  //   {
  //     leagueInfo: {
  //       date: 'January 27th, 2019',
  //       location: 'Mater Dei Catholic High School',
  //       address: '1615 Mater Dei Dr, Chula Vista, CA 91913',
  //       time: {
  //         start: '7:30AM',
  //         end: '3:00PM'
  //       },
  //       week: 3
  //     },
  //     _id: '1819-CASDW3-MATER',
  //     slots: 0
  //   }
  // ];
  // leagueInformation4 = [
  //   {
  //     _id: '1819-CASDW4-DESCARTES-SDJA',
  //     leagueInfo: {
  //       location: 'San Diego Jewish Academy',
  //       address: '11860 Carmel Creek Rd, San Diego, CA 92130',
  //       date: 'February 10th, 2019',
  //       time: {
  //         start: '8:00AM',
  //         end: '6:00PM'
  //       },
  //       leagueName: 'Descartes',
  //       week: 4
  //     },
  //     slots: 0
  //   },
  //   {
  //     _id: '1819-CASDW4-TURING-SDJA',
  //     leagueInfo: {
  //       location: 'San Diego Jewish Academy',
  //       address: '11860 Carmel Creek Rd, San Diego, CA 92130',
  //       date: 'February 10th, 2019',
  //       time: {
  //         start: '8:00AM',
  //         end: '6:00PM'
  //       },
  //       leagueName: 'Turing',
  //       week: 4
  //     },
  //     slots: 0
  //   },
  //   {
  //     _id: '1819-CASDW4-GAUSS-GRAUER',
  //     leagueInfo: {
  //       location: 'The Grauer School',
  //       address: '1500 S El Camino Real, Encinitas, CA 92024',
  //       date: 'February 9th, 2019',
  //       time: {
  //         start: '8:00AM',
  //         end: '4:00PM'
  //       },
  //       leagueName: 'Gauss',
  //       week: 4
  //     },
  //     slots: 0
  //   },
  //   {
  //     _id: '1819-CASDW4-PTOLOMY-SET',
  //     leagueInfo: {
  //       location: 'SET High',
  //       address: '3540 Aero Ct, San Diego, CA 92123',
  //       date: 'February 9th, 2019',
  //       time: {
  //         start: '8:00AM',
  //         end: '4:00PM'
  //       },
  //       leagueName: 'Ptolomy',
  //       week: 4
  //     },
  //     slots: 0
  //   },
  //   {
  //     _id: '1819-CASDW4-EUCLID-SCHS',
  //     leagueInfo: {
  //       location: 'Sage Creek High School',
  //       address: '3900 Cannon Road, Carlsbad, CA 92010',
  //       date: 'February 9th, 2019',
  //       time: {
  //         start: '7:30AM',
  //         end: '5:00PM'
  //       },
  //       leagueName: 'Euclid',
  //       week: 4
  //     },
  //     slots: 0
  //   }
  // ];

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['jwt']) {
        this.jwt = params['jwt'];
        try {
          if (this.helper.decodeToken(this.jwt).teamNumber) {
            this.teamNumber = this.helper.decodeToken(this.jwt).teamNumber;
            this.http
              .get(
                '/api/leagues/token-used?key=' +
                  this.jwt
              )
              .subscribe(
                data => {
                  if (!data['used']) {
                    this.getMeetInformation();
                  } else {
                    this.errors.push(
                      'Team ' +
                        this.teamNumber +
                        ' has already made their selection. Please contact juicydatainfo@gmail.com if you believe this is mistake. Error Code: 1'
                    );
                  }
                },
                error => {
                  this.errors.push(
                    'Team ' +
                      this.teamNumber +
                      ' is not found in the database or there was a server error. Please contact support juicydatainfo@gmail.com Error Code: 2'
                  );
                }
              );
          } else {
            this.errors.push(
              'This page URL is missing a team number. Please contact support juicydatainfo@gmail.com if you encounter this page. Error Code: 3'
            );
          }
        } catch (e) {
          console.log(e);
          this.errors.push(
            'There was a server error. Please contact support juicydatainfo@gmail.com Error Code: 4'
          );
        }
      } else {
        this.errors.push(
          'This page URL is missing its token. Please contact support juicydatainfo@gmail.com if you encounter this page. Error Code: 5'
        );
      }
    });
  }

  meetSelect(week, meetId, meetInformation) {
    if (week === 2) {
      this.weekPick2 = meetId;
    }
    if (week === 3) {
      this.weekPick3 = meetId;
    }
  }

  leagueSelect(i) {
    this.weekPick1 = this.leagueInformation1[i]._id;
    this.weekPick4 = this.leagueInformation4[i]._id;
  }

  getMeetInformation() {
    this.http.get('/api/leagues/get-info').subscribe(
      data => {
        console.log('Get Meet Information', data);
        this.leagueInformation1 = [];
        this.leagueInformation4 = [];
        for (let index = 0; index < data['leagues'].length; index++) {
          console.log(data['leagues'][index]);
          if (data['leagues'][index]['leagueWeek'] === 1) {
            for (let i = 0; i < data['leagues'][index]['leagueMeets'].length; i++) {
              if (data['leagues'][index]['leagueMeets'][i]['leagueInfo']['leagueName'] === 'Descartes') {
                this.leagueInformation1[0] = data['leagues'][index]['leagueMeets'][i];
              }
              if (data['leagues'][index]['leagueMeets'][i]['leagueInfo']['leagueName'] === 'Turing') {
                this.leagueInformation1[1] = data['leagues'][index]['leagueMeets'][i];
              }
              if (data['leagues'][index]['leagueMeets'][i]['leagueInfo']['leagueName'] === 'Gauss') {
                this.leagueInformation1[2] = data['leagues'][index]['leagueMeets'][i];
              }
              if (data['leagues'][index]['leagueMeets'][i]['leagueInfo']['leagueName'] === 'Ptolomy') {
                this.leagueInformation1[3] = data['leagues'][index]['leagueMeets'][i];
              }
              if (data['leagues'][index]['leagueMeets'][i]['leagueInfo']['leagueName'] === 'Euclid') {
                this.leagueInformation1[4] = data['leagues'][index]['leagueMeets'][i];
              }
            }
          }
          if (data['leagues'][index]['leagueWeek'] === 2) {
            this.leagueInformation2 = data['leagues'][index]['leagueMeets'];
          }
          if (data['leagues'][index]['leagueWeek'] === 3) {
            this.leagueInformation3 = data['leagues'][index]['leagueMeets'];
          }
          if (data['leagues'][index]['leagueWeek'] === 4) {
            for (let i = 0; i < data['leagues'][index]['leagueMeets'].length; i++) {
              if (data['leagues'][index]['leagueMeets'][i]['leagueInfo']['leagueName'] === 'Descartes') {
                this.leagueInformation4[0] = data['leagues'][index]['leagueMeets'][i];
              }
              if (data['leagues'][index]['leagueMeets'][i]['leagueInfo']['leagueName'] === 'Turing') {
                this.leagueInformation4[1] = data['leagues'][index]['leagueMeets'][i];
              }
              if (data['leagues'][index]['leagueMeets'][i]['leagueInfo']['leagueName'] === 'Gauss') {
                this.leagueInformation4[2] = data['leagues'][index]['leagueMeets'][i];
              }
              if (data['leagues'][index]['leagueMeets'][i]['leagueInfo']['leagueName'] === 'Ptolomy') {
                this.leagueInformation4[3] = data['leagues'][index]['leagueMeets'][i];
              }
              if (data['leagues'][index]['leagueMeets'][i]['leagueInfo']['leagueName'] === 'Euclid') {
                this.leagueInformation4[4] = data['leagues'][index]['leagueMeets'][i];
              }
            }
          }
        }
      },
      error => {
        console.log('Get Info Week 1 error', error);
      }
    );
  }

  submit() {
    this.getMeetInformation();
    if (this.validationErrors.length === 0) {
      this.doc = {
        facebook: this.teamFacebook,
        instagram: this.teamInstagram,
        twitter: this.teamTwitter,
        website: this.teamWebsite,
        weekPick1: this.weekPick1,
        weekPick2: this.weekPick2,
        weekPick3: this.weekPick3,
        weekPick4: this.weekPick4,

        jwt: this.jwt,
        logo: '',
        contacts: [
          {
            firstName: this.firstName1,
            lastName: this.lastName1,
            email: this.email1,
            phone: this.phoneNumber1
          },
          {
            firstName: this.firstName2,
            lastName: this.lastName2,
            email: this.email2,
            phone: this.phoneNumber2
          },
          {
            firstName: this.firstName3,
            lastName: this.lastName3,
            email: this.email3,
            phone: this.phoneNumber3
          }
        ]
      };
      this.http
        .post('/api/leagues/upload-logo', this.logo)
        .subscribe(
          data => {
            this.doc.logo = data['fileName'];
            this.sendSignUp();
          },
          error => {
            this.sendSignUp();
          }
        );
    }
  }

  sendSignUp() {
    this.http
      .post('/api/leagues/sign-up', this.doc)
      .subscribe(
        data => {
          this.registrationComplete = true;
        },
        error => {
          console.log('signup-error', error);
          this.validationErrors.push(
            'Team ' +
              this.teamNumber +
              ' has already made their selection, or there was a server error. Please email juicydatainfo@gmail.com for assistance. Error Code: 6'
          );
        }
      );
  }

  addContact() {
    this.count++;
    if (this.count === 2) {
      this.contact2 = true;
    }
    if (this.count === 3) {
      this.contact3 = true;
    }
  }

  removeContact() {
    if (this.count === 2) {
      this.contact2 = false;
    }
    if (this.count === 3) {
      this.contact3 = false;
    }
    this.count--;
  }

  optIn() {
    this.doc = {
      email: this.optInEmail
    };
    this.http
      .post(
        '/api/accounts/accounts/email-subscription',
        this.doc
      )
      .subscribe(
        data => {
          location.reload();
        },
        error => {
          console.log(error);
        }
      );
  }

  logoUpload(event) {
    if (event.target.files.length > 0) {
      if (event.target.files[0].size < 5000000) {
        this.logo = new FormData();
        this.logo.append('logo', event.target.files[0]);
      }
    } else {
      this.validationErrors.push('Logo file is too large');
    }
  }

  getPickedLeagueInformation() {
    this.slotErrors = [];
    this.validationErrors = [];
    const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    if (!this.weekPick1) {
      this.validationErrors.push('Please select a league');
    }
    if (!this.weekPick2) {
      this.validationErrors.push('Please select a meet for week 2');
    }
    if (!this.weekPick3) {
      this.validationErrors.push('Please select a meet for week 3');
    }
    if (!this.firstName1) {
      this.validationErrors.push(
        'Please enter a first name for the primary contact'
      );
    }
    if (!this.lastName1) {
      this.validationErrors.push(
        'Please enter a last name for the primary contact'
      );
    }
    if (!this.email1 || !EMAIL_REGEXP.test(this.email1)) {
      this.validationErrors.push(
        'Please enter a valid email for the primary contact'
      );
    }
    if (!this.phoneNumber1) {
      this.validationErrors.push(
        'Please enter a phone number for the primary contact'
      );
    }
    this.http
      .get(
        '/api/leagues/get-league?leagueId=' +
          this.weekPick1
      )
      .subscribe(
        data => {
          console.log('Get Picked League Information', data);
          this.weekPick1Information = data;
          if (this.weekPick1Information.slots > 13) {
            this.slotErrors.push(
              'The ' +
                this.weekPick1Information.leagueInfo.leagueName +
                ' league is full. Please reselect your league.'
            );
          }
        },
        error => {
          console.log(error);
        }
      );
    this.http
      .get(
        '/api/leagues/get-league?leagueId=' +
          this.weekPick2
      )
      .subscribe(
        data => {
          this.weekPick2Information = data;
          if (this.weekPick2Information.slots > 13) {
            this.slotErrors.push(
              'The week 2 meet at ' +
                this.weekPick1Information.leagueInfo.location +
                ' is full. Please reselect your week 2 meet.'
            );
          }
        },
        error => {
          console.log(error);
        }
      );
    this.http
      .get(
        '/api/leagues/get-league?leagueId=' +
          this.weekPick3
      )
      .subscribe(
        data => {
          this.weekPick3Information = data;
          if (this.weekPick3Information.slots > 13) {
            this.slotErrors.push(
              'The week 3 meet at ' +
                this.weekPick3Information.leagueInfo.location +
                ' is full. Please reselect your week 3 meet.'
            );
          }
        },
        error => {
          console.log(error);
        }
      );
    this.http
      .get(
        '/api/leagues/get-league?leagueId=' +
          this.weekPick4
      )
      .subscribe(
        data => {
          this.weekPick4Information = data;
        },
        error => {
          console.log(error);
        }
      );
  }
}
