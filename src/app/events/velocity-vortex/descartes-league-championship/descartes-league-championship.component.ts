import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-descartes-league-championship',
  templateUrl: './descartes-league-championship.component.html',
  styleUrls: ['./descartes-league-championship.component.css']
})
export class DescartesLeagueChampionshipComponent implements OnInit {
  dtOptions: DataTables.Settings = {};

  constructor() { }

  ngOnInit() {
    this.dtOptions = {
      paging: false
    };
  }

}
