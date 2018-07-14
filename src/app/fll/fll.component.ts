import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { timer } from 'rxjs/observable/timer';
import { DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-fll',
  templateUrl: './fll.component.html',
  styleUrls: ['./fll.component.css']
})
export class FllComponent implements OnInit {

  data: any;
  error: string;
  width: any;
  loading = true;
  dtOptions: DataTables.Settings = {};
  subscription: any;

  dtTrigger: Subject<any> = new Subject();

  t = timer(240000, 240000);

  constructor(private route: ActivatedRoute, private http: HttpClient, private titleService: Title) {}

  ngOnInit() {
    this.dtOptions = {
      paging: false
    };
    this.width = window.innerWidth;
    this.titleService.setTitle('CEF Robotics Showcase - Juicy Data');
    this.getData();
  }

  getData() {
    this.http.get('/api/events/fll/read').subscribe(
      data => {
        this.data = data;

        for (let i = 0; i < this.data.length; i++) {
          this.data[i].rank = 1;
          for (let j = 0; j < this.data.length; j++) {
            this.data[i].rank += this.data[i].bestScore < this.data[j].bestScore ? 1 : 0;
          }
        }
        console.log(this.data);
        this.loading = false;
      },
      error => {
        this.error = error.error;
        this.loading = false;
      }
    );
  }
}
