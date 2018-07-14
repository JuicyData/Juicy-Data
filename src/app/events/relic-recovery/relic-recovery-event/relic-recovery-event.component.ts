import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-relic-recovery-event',
  templateUrl: './relic-recovery-event.component.html',
  styleUrls: ['./relic-recovery-event.component.css']
})
export class RelicRecoveryEventComponent implements OnInit {
  dtOptions: DataTables.Settings = {};

  alliance1team1: string;
  alliance1team2: string;
  alliance2team1: string;
  alliance2team2: string;

  eventID: string; // ID of the event
  data: any;
  predictionData: any;

  error: string;

  width: any;

  definitions = true;
  loading = true;
  eventName: string;

  liveEvents = ['1718-CAL-GAMES'];

  constructor(private route: ActivatedRoute, private http: HttpClient, private titleService: Title) {}

  ngOnInit() {
    this.width = window.innerWidth;
    this.dtOptions = {
      paging: false
    };

    this.route.params.subscribe(params => {
      this.eventID = params['eventID'];
        this.getData();
        this.titleService.setTitle(this.eventID + ' - Juicy Data');
    });
  }

  getData() {
    this.http.get('/api/events/read?eventId=' + this.eventID).subscribe(
      data => {
        this.data = data;
        console.log(this.data);
        this.loading = false;
      },
      error => {
        this.error = error.error;
        this.loading = false;
      }
    );
  }

  predict() {
    this.http
      .get(
        '/api/predict?eventId=' +
          this.eventID +
          '&alliance1team1=' +
          this.alliance1team1 +
          '&alliance1team2=' +
          this.alliance1team2 +
          '&alliance2team1=' +
          this.alliance2team1 +
          '&alliance2team2=' +
          this.alliance2team2
      )
      .subscribe(
        data => {
          this.predictionData = data;
          this.eventName = data['eventInformation']['eventName'];
        },
        error => {
          this.error = error.error;
        }
      );
  }
}
