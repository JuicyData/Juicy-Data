import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { timer } from 'rxjs/observable/timer';
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-fll-view',
  templateUrl: './fll-view.component.html',
  styleUrls: ['./fll-view.component.css']
})
export class FllViewComponent implements OnInit {

  data: any;
  error: string;
  width: any;
  loading = true;
  dtOptions: DataTables.Settings = {};

  showFirst20Teams = true;

  refresh = timer(1000, 240000);
  switchTeams = timer(1000, 15000);

  constructor(private route: ActivatedRoute, private http: HttpClient, private titleService: Title) {}

  ngOnInit() {
    this.dtOptions = {
      paging: false
    };
    this.width = window.innerWidth;
    this.titleService.setTitle('FLL CEF Showcase - Juicy Data');
    this.getData();
    this.refresh.subscribe(t => {
      this.getData();
    });

    this.switchTeams.subscribe(t => {
      this.showFirst20Teams = !this.showFirst20Teams;
    });
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
