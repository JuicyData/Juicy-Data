import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-euclid-league-championship',
  templateUrl: './euclid-league-championship.component.html',
  styleUrls: ['./euclid-league-championship.component.css']
})
export class EuclidLeagueChampionshipComponent implements OnInit {
  dtOptions: DataTables.Settings = {};

  constructor() { }

  ngOnInit() {
    this.dtOptions = {
      paging: false
    };
  }

}
