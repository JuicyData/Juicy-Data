import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Inject, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type' : 'text/plain'
    })
  };

  apiServerIP = 'http://localhost/';
  scoringSoftwareIP = 'http://localhost/';

  constructor(private titleService: Title, private http: HttpClient) {
    this.titleService.setTitle('Upload - Juicy Data');
   }

  ngOnInit() {

    // doc.open();

    // console.log(doc.open())
    // doc.writeln(`<html><body><p>hello</p>
    // <script>
    //   var xmlHttp = new XMLHttpRequest();
    //   console.log(xmlHttp);
    //   xmlHttp.open("GET", 'http://localhost/apiv1/events/', false); // false for synchronous request
    //   xmlHttp.send();
    //   console.log(xmlHttp);
    // </script>
    // </body></html>`);
    // doc.close();
  }

  uploadAll() {

  }

  connectScoringSystem() {
    this.http.get(this.scoringSoftwareIP + 'apiv1/events', this.httpOptions).subscribe(data => {
      console.log(data)
    },
    error => {
      console.log(error)
    })
  }

  // uploadSchedule() {
  //   this.http.get('http://localhost/apiv1/events/' + eventID + '/matches/')
  //   .then(function(response) {
  //     console.log(response);
  //     scoringSystemSchedule = response.data.matches;
  //     tempSchedule = [];
  //     for (let i = 0; i < scoringSystemSchedule.length; i++) {
  //       tempSchedule[i] = {
  //         matchNumber: scoringSystemSchedule[i].matchNumber,
  //         teams: {
  //           red1: {
  //             teamNumber: scoringSystemSchedule[i].red.team1,
  //             surrogate: scoringSystemSchedule[i].red.isTeam1Surrogate
  //           },
  //           red2: {
  //             teamNumber: scoringSystemSchedule[i].red.team2,
  //             surrogate: scoringSystemSchedule[i].red.isTeam2Surrogate
  //           },
  //           blue1: {
  //             teamNumber: scoringSystemSchedule[i].blue.team1,
  //             surrogate: scoringSystemSchedule[i].blue.isTeam1Surrogate
  //           },
  //           blue2: {
  //             teamNumber: scoringSystemSchedule[i].blue.team2,
  //             surrogate: scoringSystemSchedule[i].blue.isTeam2Surrogate
  //           }
  //         }
  //       };
  //     }
  //     schedule = {
  //       _id: eventID,
  //       schedule: tempSchedule
  //     };
  //     console.log({ schedule });

  // }

}
