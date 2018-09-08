import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  signedIn = new Subject<boolean>();

  constructor(private http: HttpClient) {
    this.http.get('/api/accounts/accounts/check-signin').subscribe(
      data => {
        this.signedIn.next(data['signedIn']);
      },
      error => {
        this.signedIn.next(false);
      }
    );
  }
}
