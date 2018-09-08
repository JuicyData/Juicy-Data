import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  showCollapsedNavbar = false;
  width: any;

  constructor() { }

  ngOnInit() {
    this.width = window.innerWidth;
  }

  navClicked(event) {
  	event.target.parentElement.parentElement.parentElement.classList.remove('show');
  }

}
