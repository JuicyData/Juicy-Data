import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css']
})
export class BlogCreateComponent implements OnInit {

  images: any;
  error: any;
  html: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  fileUpload(event, type) {
    if (event.target.files.length > 0) {
      if (type === 'images') {
        this.images = event.target.files;
      }
      if (type === 'html') {
        this.html = event.target.files[0];
      }
    }
  }

  createPost() {
    const doc = new FormData();

    for (let i = 0; i < this.images.length; i++) {
      doc.append('images', this.images[i]);
    }
    doc.append('html', this.html);
    console.log(doc);
    this.http.post('/api/blog/posts/create', doc).subscribe(
      data => {
        console.log(data);
      },
      error => {
        this.error = error.error.message;
      }
    );
  }
}
