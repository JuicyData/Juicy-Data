import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  currentUrl = null;

  constructor(private router: Router, private http: HttpClient) {
    // Track Page Navigation
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) { // Successfully loaded new route
        let newPage = { toUrl: event.url };
        if (currentUrl) {
          newPage.fromUrl = currentUrl;
        }
        // console.log("Entered: " + newPage.toUrl);
        this.http.post('/api/navigation/enter', newPage).subscribe();
        this.currentUrl = newPage.toUrl;
      }
    });
  }
  
}
