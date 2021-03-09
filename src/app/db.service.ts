import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  constructor(private http: HttpClient) {}

  getHeaders() {
    let headers = new HttpHeaders();
    let token = window.btoa(
      environment.DB_USERNAME + ':' + environment.DB_PASSWORD
    );
    console.log(token);
    headers = headers.set('Authorization', `Basic ${token}`);

    //headers = headers.set('org', this.authService.getLoggedInOrg());
    return headers;
  }

  getCourse(id) {
    const url = environment.DB_URL + 'courses/' + id;
    return this.http.get(url, { headers: this.getHeaders() });
  }
}
