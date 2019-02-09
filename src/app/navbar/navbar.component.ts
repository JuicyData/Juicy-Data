import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  showCollapsedNavbar = false;
  width: any;

  signedIn = null;
  route: any;

  navBarMenu = false;

  constructor(private userService: UserService, private http: HttpClient, private router: Router, private location: Location) {
  // userService.signedIn.subscribe(signedIn => {
  // 	this.signedIn = signedIn;
  // 	console.log("signed in!")
  // 	console.log(signedIn)
  // })
  }

  ngOnInit() {
    this.width = window.innerWidth;
    this.router.events.subscribe((val) => {
      if (this.location.path().includes('/sd-league-registration/')) {
        this.route = 'sd-league-registration';
      } else {
        this.route = '';
      }
      if (this.location.path().includes('/events/')) {
        this.route = 'events';
      } else {
        this.route = '';
      }
    });
  }

  navClicked(event) {
    event.target.parentElement.parentElement.parentElement.classList.remove('show');
  }

  signOut() {
    this.http.get('/api/accounts/accounts/signout').subscribe(() => this.userService.signedIn.next(false));
  }

  navBarMenuToggle() {
    this.navBarMenu = !this.navBarMenu;
  }


}
