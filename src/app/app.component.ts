import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  currentPage = null;

  constructor(private router: Router, private http: HttpClient) {
    // Track Page Navigation
    // WARNING: This does not trigger when the user closes the tab
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) { // Successfully loaded new route
        let newPage = { url: event.url };
        // console.log("Entered: " + newPage.url);
        this.http.post('/api/navigation/enter', newPage).subscribe();
        this.currentPage = newPage;
      } else if (event instanceof NavigationStart) { // Navigating away from the current page
        if (this.currentPage !== null) {
          // console.log("Left: " + this.currentPage.url);
          this.http.post('/api/navigation/leave', this.currentPage).subscribe();
        }        
      }
    });
  }
  
}
