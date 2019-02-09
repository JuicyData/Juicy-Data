import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

import { RoverRuckusService } from './event-services/rover-ruckus.service';
import { EventData } from './event-data/event-data';

@Component({
  selector: 'app-rover-ruckus',
  templateUrl: './rover-ruckus.component.html',
  styleUrls: ['./rover-ruckus.component.css']
})
export class RoverRuckusComponent implements OnInit {
  alliance1team1: string;
  alliance1team2: string;
  alliance2team1: string;
  alliance2team2: string;

  eventID: string; // ID of the event
  eventData: EventData;
  data: EventData;
  predictionData: any;

  error: string;

  width: any;

  definitions = true;
  loading = true;
  eventName: string;
  currentTab = 'ranking';

  sortedColumns = {
    ranking: {
      column: 'rank',
      order: 'increasing'
    },
    matchHistory: {
      column: 'matchNumber',
      order: 'increasing'
    },
    averageScores: {
      column: 'teamNumber',
      order: 'decreasing'
    }
  };

  liveEvents = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, private titleService: Title, private roverRuckusService: RoverRuckusService) {}

  ngOnInit() {
    this.width = window.innerWidth;
    this.route.params.subscribe(params => {
      this.eventID = params['eventID'];
      this.getData();

    });
  }

  getData() {
    this.roverRuckusService.getEvent(this.eventID).subscribe(
      eventData => {
        this.data = eventData;
        this.eventName = eventData.eventInformation.name;
        this.loading = false;
        this.sortColumn1('averageScores', 'teamnumber');
        this.titleService.setTitle(this.eventName + ' - Juicy Data');
      },
      error => {
        this.error = error;
        this.loading = false;
      }
    );
  }

  switchTabs(tab) {
    this.currentTab = tab;
  }

  sortColumn1(table, column) {
    if (this.sortedColumns[table].order === 'increasing' || column !== this.sortedColumns[table].column) {
      this.sortedColumns[table].column = column;
      this.sortedColumns[table].order = 'decreasing';
      this.data[table].sort(function(a, b) {
        return b[column] - a[column];
      });
    } else {
      this.sortedColumns[table].column = column;
      this.sortedColumns[table].order = 'increasing';
      this.data[table].sort(function(a, b) {
        return a[column] - b[column];
      });
    }
  }

  sortColumn2(table, column1, column2) {
    if (this.sortedColumns[table].order === 'increasing' || column1 + column2 !== this.sortedColumns[table].column) {
      this.sortedColumns[table].column = column1 + column2;
      this.sortedColumns[table].order = 'decreasing';
      this.data[table].sort(function(a, b) {
        return b[column1][column2] - a[column1][column2];
      });
    } else {
      this.sortedColumns[table].column = column1 + column2;
      this.sortedColumns[table].order = 'increasing';
      this.data[table].sort(function(a, b) {
        return a[column1][column2] - b[column1][column2];
      });
    }
  }

  sortColumn3(table, column1, column2, column3) {
    if (this.sortedColumns[table].order === 'increasing' || column1 + column2 + column3 !== this.sortedColumns[table].column) {
      this.sortedColumns[table].column = column1 + column2 + column3;
      this.sortedColumns[table].order = 'decreasing';
      this.data[table].sort(function(a, b) {
        return b[column1][column2][column3] - a[column1][column2][column3];
      });
    } else {
      this.sortedColumns[table].column = column1 + column2 + column3;
      this.sortedColumns[table].order = 'increasing';
      this.data[table].sort(function(a, b) {
        return a[column1][column2][column3] - b[column1][column2][column3];
      });
    }
  }
}
