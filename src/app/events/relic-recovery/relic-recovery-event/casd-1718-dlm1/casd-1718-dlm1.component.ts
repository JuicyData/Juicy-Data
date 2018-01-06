import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-casd-1718-dlm1',
  templateUrl: './casd-1718-dlm1.component.html',
  styleUrls: ['./casd-1718-dlm1.component.css']
})
export class Casd1718Dlm1Component implements OnInit {
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
        teamNumber: 12765,
        teamName: 'Electric Dragons',
        record: {
          win: 5,
          losses: 0,
          ties: 0
        },
        qualifyingPoints: 10,
        rankingPoints: 189,
        averageScore: 108.149,
        averageMarginalScore: 114.694
      },
      {
        rank: 2,
        teamNumber: 4262,
        teamName: 'Ridgebots',
        record: {
          win: 4,
          losses: 1,
          ties: 0
        },
        qualifyingPoints: 8,
        rankingPoints: 332,
        averageScore: 122.558,
        averageMarginalScore: 70.829
      },
      {
        rank: 3,
        teamNumber: 11656,
        teamName: 'iKickBots',
        record: {
          win: 4,
          losses: 1,
          ties: 0
        },
        qualifyingPoints: 8,
        rankingPoints: 302,
        averageScore: 52.332,
        averageMarginalScore: -1.239
      },
      {
        rank: 4,
        teamNumber: 11350,
        teamName: 'Sloth Slowbotics',
        record: {
          win: 4,
          losses: 1,
          ties: 0
        },
        qualifyingPoints: 8,
        rankingPoints: 297,
        averageScore: 100.874,
        averageMarginalScore: 78.26
      },
      {
        rank: 5,
        teamNumber: 3848,
        teamName: 'Shockwave',
        record: {
          win: 4,
          losses: 1,
          ties: 0
        },
        qualifyingPoints: 8,
        rankingPoints: 284,
        averageScore: 72.967,
        averageMarginalScore: 23.17
      },
      {
        rank: 6,
        teamNumber: 9266,
        teamName: 'Pyrobots',
        record: {
          win: 3,
          losses: 2,
          ties: 0
        },
        qualifyingPoints: 6,
        rankingPoints: 307,
        averageScore: 67.982,
        averageMarginalScore: 20.786
      },
      {
        rank: 7,
        teamNumber: 10390,
        teamName: 'STEM Scouts At-Large',
        record: {
          win: 3,
          losses: 2,
          ties: 0
        },
        qualifyingPoints: 6,
        rankingPoints: 166,
        averageScore: -16.328,
        averageMarginalScore: -78.469
      },
      {
        rank: 8,
        teamNumber: 10809,
        teamName: 'Crow Force 5',
        record: {
          win: 2,
          losses: 3,
          ties: 0
        },
        qualifyingPoints: 4,
        rankingPoints: 277,
        averageScore: 28.184,
        averageMarginalScore: -7.261
      },
      {
        rank: 9,
        teamNumber: 8097,
        teamName: 'Botcats',
        record: {
          win: 2,
          losses: 3,
          ties: 0
        },
        qualifyingPoints: 4,
        rankingPoints: 225,
        averageScore: 28.801,
        averageMarginalScore: -18.132
      },
      {
        rank: 10,
        teamNumber: 10793,
        teamName: 'Voltrons',
        record: {
          win: 2,
          losses: 3,
          ties: 0
        },
        qualifyingPoints: 4,
        rankingPoints: 181,
        averageScore: 23.899,
        averageMarginalScore: 6.748
      },
      {
        rank: 11,
        teamNumber: 9261,
        teamName: 'Level Up',
        record: {
          win: 1,
          losses: 4,
          ties: 0
        },
        qualifyingPoints: 2,
        rankingPoints: 424,
        averageScore: 77.248,
        averageMarginalScore: -5.79
      },
      {
        rank: 12,
        teamNumber: 5135,
        teamName: 'Team Uncopyrightable',
        record: {
          win: 1,
          losses: 4,
          ties: 0
        },
        qualifyingPoints: 2,
        rankingPoints: 324,
        averageScore: 30.402,
        averageMarginalScore: -27.853
      },
      {
        rank: 13,
        teamNumber: 11285,
        teamName: 'PATENT PENDING',
        record: {
          win: 1,
          losses: 4,
          ties: 0
        },
        qualifyingPoints: 2,
        rankingPoints: 233,
        averageScore: 25.832,
        averageMarginalScore: -22.264
      },
      {
        rank: 14,
        teamNumber: 10092,
        teamName: 'Green.Griffins',
        record: {
          win: 1,
          losses: 4,
          ties: 0
        },
        qualifyingPoints: 2,
        rankingPoints: 229,
        averageScore: 3.03,
        averageMarginalScore: -73.216
      },
      {
        rank: 15,
        teamNumber: 5131,
        teamName: 'Pointers',
        record: {
          win: 0,
          losses: 5,
          ties: 0
        },
        qualifyingPoints: 0,
        rankingPoints: 200,
        averageScore: -15.99,
        averageMarginalScore: -72.432
      }
    ];
  }
}
