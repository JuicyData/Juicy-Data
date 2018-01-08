import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-relic-recovery-event',
  templateUrl: './relic-recovery-event.component.html',
  styleUrls: ['./relic-recovery-event.component.css']
})
export class RelicRecoveryEventComponent implements OnInit {

  dtOptions: DataTables.Settings = {};

  eventID: string; // ID of the event
  data: any;

  error: string;


  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.dtOptions = {
      paging: false
    };

    this.route.params.subscribe(params => {
      this.eventID = params['eventID'];
      this.getData();
    });
  }

  getData() {
    this.http.get('/api/events/read?eventId=' + this.eventID).subscribe(
      data => {
        this.data = data;
      },
      error => {
        this.error = error.error;
      }
    );
  }

}
