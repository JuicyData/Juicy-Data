import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-a-few-tips-to-bring-your-driving-game-to-the-next-level',
  templateUrl: './a-few-tips-to-bring-your-driving-game-to-the-next-level.component.html',
  styleUrls: ['./a-few-tips-to-bring-your-driving-game-to-the-next-level.component.css']
})
export class AFewTipsToBringYourDrivingGameToTheNextLevelComponent implements OnInit {

  email: any;
  error: any;
  doc: any;

  constructor(private titleService: Title, private http: HttpClient) { }

  ngOnInit() {
    this.titleService.setTitle('Decision Making - Juicy Data');
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
