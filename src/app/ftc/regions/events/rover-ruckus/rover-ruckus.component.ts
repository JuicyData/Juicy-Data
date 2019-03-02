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
  modal = false;

  definitions = true;
  loading = true;
  eventName: string;
  currentTab = 'ranking';
  schedule: any;

  teamList: any;
  rankList: any;
  teamNameList: any;

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
    this.currentTab = 'schedule';
    this.width = window.innerWidth;
    this.route.params.subscribe(params => {
      this.eventID = params['eventID'];
      this.getSchedule();
      this.getData();
    });
  }

  autoRefresh() {
    setInterval(this.getData(), 300000);
  }



  getData(): any {
    this.roverRuckusService.getEvent(this.eventID).subscribe(
      eventData => {


          this.data = eventData;
          this.eventName = eventData.eventInformation.name;
        if(eventData.ranking !== undefined) {
          this.currentTab = 'ranking';
          this.sortColumn1('averageScores', 'teamNumber');
          this.titleService.setTitle(this.eventName + ' - Juicy Data');
          this.teamList = {};
          for (let i = 0; i < this.data.ranking.length; i++) {
            this.teamList[this.data.ranking[i].teamNumber] = this.data.ranking[i].teamName;
          }
          this.rankList = {};
          for (let i = 0; i < this.data.rank.length; i++) {
            this.rankList[this.data.rank[i].team] = this.data.rank[i].ranking;
          }
          for (let i = 0; i < this.data.ranking.length; i++) {
            this.data.ranking[i].rank = this.rankList[this.data.ranking[i].teamNumber]
          }
          this.sortColumn1('ranking', 'rank');
          this.sortColumn1('ranking', 'rank');
          this.loading = false;
       } else {
        this.loading = false;
       }
      },
      error => {
        this.error = error;
        this.loading = false;
      }
    );
  }

  getSchedule() {
    this.http.get('/api/events/ftc/event/schedule/read?eventId=' + this.eventID).subscribe(data => {
      this.schedule = data;
      this.teamNameList = {};
        for (let i = 0; i < this.schedule['teams'].length; i++) {
          this.teamNameList[this.schedule['teams'][i]['_id']] = this.schedule['teams'][i]['name'];
        }
    },
    error => {
      this.error = error;
      this.loading = false;
    });
  }

  modalOpen() {
    this.modal = !this.modal;
    if (this.modal === true) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
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

  onResize(event) {
    this.width = event.target.innerWidth;
  }
}
