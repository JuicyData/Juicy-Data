import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  teamNumber: number;

  error: string;

  data: any;

  loading = true;

  constructor(private http: HttpClient, private route: ActivatedRoute, private titleService: Title) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.teamNumber = params['teamNumber'];
      this.titleService.setTitle('Team ' + this.teamNumber + ' - Juicy Data');
      this.readTeam();
    });

  }

  readTeam() {
    this.http.get('/api/teams/read?teamNumber=' + this.teamNumber).subscribe(
      data => {
        this.data = data;
        console.log('data', this.data);
        this.loading = false;
      },
      error => {
        this.error = error.error;
        console.log('error: ', this.error);
        this.loading = false;
      }
    );
  }

}
