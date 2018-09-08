import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  showCollapsedNavbar = false;
  width: any;

  signedIn = null;

  constructor(private userService: UserService, private http: HttpClient) {
  	userService.signedIn.subscribe(signedIn => {
  		this.signedIn = signedIn;
  		console.log("signed in!")
  		console.log(signedIn)
  	})
  }

  ngOnInit() {
    this.width = window.innerWidth;
  }

  navClicked(event) {
  	event.target.parentElement.parentElement.parentElement.classList.remove('show');
  }

  signOut() {
  	this.http.get("/api/accounts/accounts/signout").subscribe(() => this.userService.signedIn.next(false));
  }

}
