import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-tetrix-vs-vexpro-the-facts',
  templateUrl: './tetrix-vs-vexpro-the-facts.component.html',
  styleUrls: ['../posts.css']
})
export class TetrixVsVexproTheFactsComponent implements OnInit {

  email: any;
  error: any;
  doc: any;

  constructor(private titleService: Title, private http: HttpClient) {
    this.titleService.setTitle('TETRIX vs. VEXPro: The Facts - Juicy Data');
  }

  ngOnInit() {
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
