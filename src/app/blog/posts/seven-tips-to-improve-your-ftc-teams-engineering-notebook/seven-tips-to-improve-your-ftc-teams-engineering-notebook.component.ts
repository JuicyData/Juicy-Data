import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-seven-tips-to-improve-your-ftc-teams-engineering-notebook',
  templateUrl: './seven-tips-to-improve-your-ftc-teams-engineering-notebook.component.html',
  styleUrls: ['./seven-tips-to-improve-your-ftc-teams-engineering-notebook.component.css']
})
export class SevenTipsToImproveYourFtcTeamsEngineeringNotebookComponent implements OnInit {

  email: any;
  error: any;
  doc: any;

  constructor(private titleService: Title, private http: HttpClient) { }

  ngOnInit() {
    this.titleService.setTitle('6 Tips to Improve your FTC Team\'s Engineering Notebook - Juicy Data');
  }

  subscribe() {
    console.log(this.email);
    this.doc = {
      email: this.email
    };
    this.http.post('/api/accounts/accounts/email-subscription', this.doc).subscribe(
      data => {
        console.log(data);
        location.reload();
      },
      error => {
        this.error = error.error.message;
      }

    );
    }

}
