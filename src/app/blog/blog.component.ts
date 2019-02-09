import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  posts = [{title: 'wfa'}, {title: 'fwa'}, {title: 'fwa'}];

  constructor(private titleService: Title) {
    this.titleService.setTitle('Blog - Juicy Data');
  }

  ngOnInit() {

  }

}
