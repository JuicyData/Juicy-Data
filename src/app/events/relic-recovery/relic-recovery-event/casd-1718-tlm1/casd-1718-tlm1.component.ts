import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-casd-1718-tlm1',
  templateUrl: './casd-1718-tlm1.component.html',
  styleUrls: ['./casd-1718-tlm1.component.css']
})
export class Casd1718Tlm1Component implements OnInit {

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
      teamNumber: 12500,
      teamName: 'Gear Up',
      record: {
      win: 5,
      losses: 0,
      ties: 0
      },
      qualifyingPoints: 10,
      rankingPoints: 347,
      averageScore: 108.436,
      averageMarginalScore: 100.576
      },
      {
      rank: 2,
      teamNumber: 4216,
      teamName: 'Rise of Hephaestus',
      record: {
      win: 5,
      losses: 0,
      ties: 0
      },
      qualifyingPoints: 10,
      rankingPoints: 262,
      averageScore: 204.389,
      averageMarginalScore: 213.55
      },
      {
      rank: 3,
      teamNumber: 9367,
      teamName: 'Torrey Techies White',
      record: {
      win: 4,
      losses: 1,
      ties: 0
      },
      qualifyingPoints: 8,
      rankingPoints: 336,
      averageScore: 62.639,
      averageMarginalScore: 29.5
      },
      {
      rank: 4,
      teamNumber: 8380,
      teamName: 'UC Robotics',
      record: {
      win: 3,
      losses: 2,
      ties: 0
      },
      qualifyingPoints: 6,
      rankingPoints: 190,
      averageScore: 16.287,
      averageMarginalScore: -36.543
      },
      {
      rank: 5,
      teamNumber: 8742,
      teamName: 'RoboTechs',
      record: {
      win: 2,
      losses: 3,
      ties: 0
      },
      qualifyingPoints: 4,
      rankingPoints: 388,
      averageScore: 23.602,
      averageMarginalScore: -75.41
      },
      {
      rank: 6,
      teamNumber: 3650,
      teamName: 'Torrey Techies',
      record: {
      win: 2,
      losses: 3,
      ties: 0
      },
      qualifyingPoints: 4,
      rankingPoints: 365,
      averageScore: 37.289,
      averageMarginalScore: -19.639
      },
      {
      rank: 7,
      teamNumber: 11212,
      teamName: 'The Clueless',
      record: {
      win: 2,
      losses: 3,
      ties: 0
      },
      qualifyingPoints: 4,
      rankingPoints: 356,
      averageScore: 90.09,
      averageMarginalScore: 41.42
      },
      {
      rank: 8,
      teamNumber: 11938,
      teamName: 'GPA Eagles Robotics Team',
      record: {
      win: 2,
      losses: 3,
      ties: 0
      },
      qualifyingPoints: 4,
      rankingPoints: 275,
      averageScore: 9.171,
      averageMarginalScore: -81.482
      },
      {
      rank: 9,
      teamNumber: 11288,
      teamName: 'Seminerds',
      record: {
      win: 2,
      losses: 3,
      ties: 0
      },
      qualifyingPoints: 4,
      rankingPoints: 248,
      averageScore: 42.583,
      averageMarginalScore: 42.216
      },
      {
      rank: 10,
      teamNumber: 6074,
      teamName: 'RAWALA',
      record: {
      win: 2,
      losses: 3,
      ties: 0
      },
      qualifyingPoints: 4,
      rankingPoints: 230,
      averageScore: -9.565,
      averageMarginalScore: -83.718
      },
      {
      rank: 11,
      teamNumber: 8906,
      teamName: 'ROARbots',
      record: {
      win: 1,
      losses: 4,
      ties: 0
      },
      qualifyingPoints: 2,
      rankingPoints: 164,
      averageScore: -8.253,
      averageMarginalScore: -84.261
      },
      {
      rank: 12,
      teamNumber: 12823,
      teamName: 'Crescendo',
      record: {
      win: 0,
      losses: 5,
      ties: 0
      },
      qualifyingPoints: 0,
      rankingPoints: 259,
      averageScore: 36.132,
      averageMarginalScore: -46.211
      },];
  }

}
