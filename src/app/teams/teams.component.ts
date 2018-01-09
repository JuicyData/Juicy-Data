import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {

  teamNumber: number;

  error: string;

  data: any;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.teamNumber = params['teamNumber'];
      this.readTeam();
    });
  }

  readTeam() {
    this.http.get('/api/teams/read?teamNumber=' + this.teamNumber).subscribe(
      data => {
        this.data = data;
        console.log('data', this.data)
      },
      error => {
        this.error = error.error;
        console.log('error: ', this.error)
      }
    );
  }

}
