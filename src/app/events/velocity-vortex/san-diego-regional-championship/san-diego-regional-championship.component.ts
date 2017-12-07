import { Component, OnInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';

@Component({
  selector: 'app-san-diego-regional-championship',
  templateUrl: './san-diego-regional-championship.component.html',
  styleUrls: ['./san-diego-regional-championship.component.css']
})
export class SanDiegoRegionalChampionshipComponent implements OnInit {
 dtOptions: DataTables.Settings = {};

  constructor() { }

  ngOnInit() {
  	    this.dtOptions = {
      paging: false
    };
}
}