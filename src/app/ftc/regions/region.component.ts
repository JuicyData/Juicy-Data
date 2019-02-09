import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent implements OnInit {

  teamNumber: number;

  error: string;

  data: any;

  loading = true;


  constructor(private http: HttpClient, private route: ActivatedRoute, private titleService: Title) {
    this.titleService.setTitle('San Diego FTC Region Events - Juicy Data');
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      // this.teamNumber = params['teamNumber'];
      // this.titleService.setTitle('Team ' + this.teamNumber + ' - Juicy Data');
      // this.readTeam();
    });
  }
}
