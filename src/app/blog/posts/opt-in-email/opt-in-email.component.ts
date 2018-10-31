import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-opt-in-email',
  templateUrl: './opt-in-email.component.html',
  styleUrls: ['./opt-in-email.component.css']
})
export class OptInEmailComponent implements OnInit {

  email: any;
  error: any;
  doc: any;

  constructor(private http: HttpClient) { }

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
