import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-seven-tips-to-improve-your-ftc-teams-engineering-notebook',
  templateUrl: './seven-tips-to-improve-your-ftc-teams-engineering-notebook.component.html',
  styleUrls: ['../posts.css']
})
export class SevenTipsToImproveYourFtcTeamsEngineeringNotebookComponent implements OnInit {

  constructor(private titleService: Title) {
    this.titleService.setTitle('6 Tips to Improve your FTC Team\'s Engineering Notebook - Juicy Data');
  }

  ngOnInit() {
  }

}
