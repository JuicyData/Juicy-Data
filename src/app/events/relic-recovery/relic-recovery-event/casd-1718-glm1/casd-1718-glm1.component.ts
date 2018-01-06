import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-casd-1718-glm1',
  templateUrl: './casd-1718-glm1.component.html',
  styleUrls: ['./casd-1718-glm1.component.css']
})
export class Casd1718Glm1Component implements OnInit {

  dtOptions: DataTables.Settings = {};

  eventID: string; // ID of the event
  data: any;

  error: string;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.dtOptions = {
      paging: false
    };

    this.data = [{
      rank: 1,
      teamNumber: 8606,
      teamName: 'RSF Intergalactic Dragons',
      record: {
      win: 5,
      losses: 0,
      ties: 0
      },
      qualifyingPoints: 10,
      rankingPoints: 222,
      averageScore: 157.791,
      averageMarginalScore: 132.801
      },
      {
      rank: 2,
      teamNumber: 9892,
      teamName: 'EngiNERDs',
      record: {
      win: 4,
      losses: 1,
      ties: 0
      },
      qualifyingPoints: 8,
      rankingPoints: 240,
      averageScore: 50.766,
      averageMarginalScore: 15.021
      },
      {
      rank: 3,
      teamNumber: 12605,
      teamName: 'RSF Virtual Vipers',
      record: {
      win: 4,
      losses: 1,
      ties: 0
      },
      qualifyingPoints: 8,
      rankingPoints: 156,
      averageScore: 6.853,
      averageMarginalScore: 2.983
      },
      {
      rank: 4,
      teamNumber: 13224,
      teamName: 'Face The Challenge',
      record: {
      win: 3,
      losses: 1,
      ties: 1
      },
      qualifyingPoints: 7,
      rankingPoints: 280,
      averageScore: 44.628,
      averageMarginalScore: 23.344
      },
      {
      rank: 5,
      teamNumber: 8605,
      teamName: 'RSF Logitechies',
      record: {
      win: 3,
      losses: 1,
      ties: 1
      },
      qualifyingPoints: 7,
      rankingPoints: 224,
      averageScore: 37.413,
      averageMarginalScore: -7.923
      },
      {
      rank: 6,
      teamNumber: 5015,
      teamName: 'Buffalo Wings',
      record: {
      win: 3,
      losses: 2,
      ties: 0
      },
      qualifyingPoints: 6,
      rankingPoints: 174,
      averageScore: 13.865,
      averageMarginalScore: 11.847
      },
      {
      rank: 7,
      teamNumber: 9049,
      teamName: 'RoboPuffs',
      record: {
      win: 3,
      losses: 2,
      ties: 0
      },
      qualifyingPoints: 6,
      rankingPoints: 160,
      averageScore: -8.361,
      averageMarginalScore: -30.609
      },
      {
      rank: 8,
      teamNumber: 7696,
      teamName: 'RSF Singularity',
      record: {
      win: 3,
      losses: 2,
      ties: 0
      },
      qualifyingPoints: 6,
      rankingPoints: 138,
      averageScore: 35.238,
      averageMarginalScore: -7.652
      },
      {
      rank: 9,
      teamNumber: 9164,
      teamName: 'Zorrobots',
      record: {
      win: 2,
      losses: 2,
      ties: 1
      },
      qualifyingPoints: 5,
      rankingPoints: 216,
      averageScore: 32.346,
      averageMarginalScore: 13.509
      },
      {
      rank: 10,
      teamNumber: 13891,
      teamName: 'Serendipity',
      record: {
      win: 1,
      losses: 4,
      ties: 0
      },
      qualifyingPoints: 2,
      rankingPoints: 186,
      averageScore: 33.431,
      averageMarginalScore: -24.794
      },
      {
      rank: 11,
      teamNumber: 13383,
      teamName: 'Nazareth Eagles 2.0',
      record: {
      win: 1,
      losses: 4,
      ties: 0
      },
      qualifyingPoints: 2,
      rankingPoints: 156,
      averageScore: 23.103,
      averageMarginalScore: -11.289
      },
      {
      rank: 12,
      teamNumber: 12748,
      teamName: 'B1nary Drag0ns',
      record: {
      win: 1,
      losses: 4,
      ties: 0
      },
      qualifyingPoints: 2,
      rankingPoints: 132,
      averageScore: 1.868,
      averageMarginalScore: 4.429
      },
      {
      rank: 13,
      teamNumber: 11411,
      teamName: 'Cherry Pi',
      record: {
      win: 1,
      losses: 4,
      ties: 0
      },
      qualifyingPoints: 2,
      rankingPoints: 112,
      averageScore: 1.42,
      averageMarginalScore: -50.195
      },
      {
      rank: 14,
      teamNumber: 6226,
      teamName: 'Bambusa',
      record: {
      win: 1,
      losses: 4,
      ties: 0
      },
      qualifyingPoints: 2,
      rankingPoints: 86,
      averageScore: 21.586,
      averageMarginalScore: -12.935
      },
      {
      rank: 15,
      teamNumber: 13185,
      teamName: 'Battle Sheep',
      record: {
      win: 0,
      losses: 5,
      ties: 1
      },
      qualifyingPoints: 1,
      rankingPoints: 204,
      averageScore: 21.127,
      averageMarginalScore: -63.205
      }];
  }

}
