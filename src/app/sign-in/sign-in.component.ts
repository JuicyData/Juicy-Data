import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SignInComponent implements OnInit {

  email: string;
  password: string;
  error: string;
  buttonText = 'Sign In';
  rememberMe = true;

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  signin() {
    this.buttonText = '';
    this.error = '';
    const doc = {
      email: this.email,
      password: this.password
    };
    this.http.post('/api/accounts/accounts/signin', doc).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/events']);
        // this.cookieService.set( 'token', '' + data['token'] );
      },
      error => {
        this.buttonText = 'Sign In';
        this.error = error.error.message;
      }
    );
  }

}
