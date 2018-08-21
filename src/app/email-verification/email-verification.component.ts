import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  verificationCode: any;
  data: any;
  error: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.verificationCode = params['data'];
      this.sendVerification();
    });
  }

  sendVerification() {
    this.http.get('/api/accounts/accounts/email-verification/verify?data=' + this.verificationCode).subscribe(
      data => {
        this.data = data;
        console.log(this.data);
      },
      error => {
        this.error = error.error;
      }
    );
  }

}
