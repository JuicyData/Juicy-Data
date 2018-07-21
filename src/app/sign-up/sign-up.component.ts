import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SignUpComponent implements OnInit {

  error: string;
  password: string;
  confirmPassword: string;
  email: string;
  buttonText = 'Sign Up';
  firstName: string;
  lastName: string;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {}

  signup() {
    this.buttonText = '';
    this.error = '';
    if (this.password.length >= 4) {
      if (this.password === this.confirmPassword) {
        const doc = {
          email: this.email,
          password: this.password,
          profile: {
            firstName: this.firstName,
            lastName: this.lastName
          }
        };
        this.http.post('/api/accounts/accounts/signup', doc).subscribe(
          data => {
            console.log(data);
            // this.cookieService.set( 'token', '' + data['token'] );

          },
          error => {
            console.log(error);
            this.error = error.error.message;
            this.buttonText = 'Sign Up';
          }
        );
      } else {
        this.error = 'Passwords must match';
        this.buttonText = 'Sign Up';
      }
    } else {
      this.error = 'Password must be more than 3 characters ';
      this.buttonText = 'Sign Up';
    }
  }
}
