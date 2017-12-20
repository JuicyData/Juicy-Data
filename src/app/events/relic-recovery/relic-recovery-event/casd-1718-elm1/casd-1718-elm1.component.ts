import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-casd-1718-elm1',
  templateUrl: './casd-1718-elm1.component.html',
  styleUrls: ['./casd-1718-elm1.component.css']
})
export class Casd1718Elm1Component implements OnInit {
  dtOptions: DataTables.Settings = {};

  eventID: string; // ID of the event
  data: any;

  error: string;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.dtOptions = {
      paging: false
    };

    this.data = [
      {
        rank: 1,
        teamNumber: 11128,
        teamName: 'Inspiration',
        record: {
        win: 4,
        losses: 1,
        ties: 0
        },
        qualifyingPoints: 8,
        rankingPoints: 182,
        averageScore: 56.376,
        averageMarginalScore: 44.36
        },
        {
        rank: 2,
        teamNumber: 12073,
        teamName: 'The Trisectors',
        record: {
        win: 4,
        losses: 1,
        ties: 0
        },
        qualifyingPoints: 8,
        rankingPoints: 174,
        averageScore: 43.838,
        averageMarginalScore: 17.892
        },
        {
        rank: 3,
        teamNumber: 9441,
        teamName: 'Syndicate',
        record: {
        win: 4,
        losses: 1,
        ties: 0
        },
        qualifyingPoints: 8,
        rankingPoints: 155,
        averageScore: 56.453,
        averageMarginalScore: 39.513
        },
        {
        rank: 4,
        teamNumber: 12666,
        teamName: 'D39 RetroRobots',
        record: {
        win: 3,
        losses: 1,
        ties: 0
        },
        qualifyingPoints: 6,
        rankingPoints: 225,
        averageScore: 60.929,
        averageMarginalScore: 56.249
        },
        {
        rank: 5,
        teamNumber: 5540,
        teamName: 'Skynet',
        record: {
        win: 3,
        losses: 1,
        ties: 0
        },
        qualifyingPoints: 6,
        rankingPoints: 192,
        averageScore: 21.256,
        averageMarginalScore: -23.666
        },
        {
        rank: 6,
        teamNumber: 4278,
        teamName: 'De.Evolution',
        record: {
        win: 2,
        losses: 2,
        ties: 0
        },
        qualifyingPoints: 4,
        rankingPoints: 211,
        averageScore: 41.76,
        averageMarginalScore: -19.148
        },
        {
        rank: 7,
        teamNumber: 6003,
        teamName: 'SFC Techno Eagles',
        record: {
        win: 2,
        losses: 2,
        ties: 0
        },
        qualifyingPoints: 4,
        rankingPoints: 167,
        averageScore: 15.428,
        averageMarginalScore: -40.643
        },
        {
        rank: 8,
        teamNumber: 9837,
        teamName: 'Ravenettes',
        record: {
        win: 2,
        losses: 2,
        ties: 0
        },
        qualifyingPoints: 4,
        rankingPoints: 164,
        averageScore: 28.838,
        averageMarginalScore: -7.508
        },
        {
        rank: 9,
        teamNumber: 7159,
        teamName: 'Robo Ravens',
        record: {
        win: 1,
        losses: 3,
        ties: 0
        },
        qualifyingPoints: 2,
        rankingPoints: 192,
        averageScore: 16.795,
        averageMarginalScore: -24.544
        },
        {
        rank: 10,
        teamNumber: 13184,
        teamName: 'Radiating Robots',
        record: {
        win: 0,
        losses: 4,
        ties: 0
        },
        qualifyingPoints: 0,
        rankingPoints: 182,
        averageScore: 5.166,
        averageMarginalScore: -43.25
        }
    ];
  }

}
