import { Component, OnInit } from '@angular/core';
import { DataTablesModule } from 'angular-datatables';


@Component({
  selector: 'app-turing-league-championship',
  templateUrl: './turing-league-championship.component.html',
  styleUrls: ['./turing-league-championship.component.css']
})
export class TuringLeagueChampionshipComponent implements OnInit {
 dtOptions: DataTables.Settings = {};

  constructor() { }

 ngOnInit() {
    this.dtOptions = {
      paging: false
    };
}

}
