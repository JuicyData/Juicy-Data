import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  link: any;
  redirect: any;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.link = params['link'];
      this.http.get('/api/misc/link-unshorten?shortLink=' + this.link).subscribe(
        data => {
          this.redirect = data['link'];
          this.router.navigate(['' + this.redirect]);
        },
        error => {
          this.router.navigate(['/']);
        }
      );
    });
  }
}
