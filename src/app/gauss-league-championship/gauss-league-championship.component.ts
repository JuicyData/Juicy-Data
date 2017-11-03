import { Component, OnInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-gauss-league-championship',
  templateUrl: './gauss-league-championship.component.html',
  styleUrls: ['./gauss-league-championship.component.css']
})
export class GaussLeagueChampionshipComponent implements OnInit {
 dtOptions: DataTables.Settings = {};
  constructor() { }

  ngOnInit() {
  	    this.dtOptions = {
      paging: false
    };
  }

}
