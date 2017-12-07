import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-relic-recovery-event',
  templateUrl: './relic-recovery-event.component.html',
  styleUrls: ['./relic-recovery-event.component.css']
})
export class RelicRecoveryEventComponent implements OnInit {

  dtOptions: DataTables.Settings = {};

  week: string; // week-1
  event: string; // YYYY-MM-DD-(eventname/location)


  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.dtOptions = {
      paging: false
    };

    this.route.params.subscribe(params => {
      this.week = params['week'];
      this.event = params['event'];
    });
  }

}
