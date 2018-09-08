import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  email: any;
  error: any;
  doc: any;

  constructor(private titleService: Title, private router: Router, private http: HttpClient) { }

  ngOnInit() {
    this.titleService.setTitle('Home - Juicy Data');
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
