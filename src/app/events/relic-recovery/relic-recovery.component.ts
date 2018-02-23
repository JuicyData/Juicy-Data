import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-relic-recovery',
  templateUrl: './relic-recovery.component.html',
  styleUrls: ['./relic-recovery.component.css']
})
export class RelicRecoveryComponent implements OnInit {

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Events - Juicy Data');
  }

}
