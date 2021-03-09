import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CourseClient } from '@ks-sdk-client/rest';
import { AuthService } from 'auth';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  loggedInUser: any;
  loggedInUsername: string;
  org: string;
  headers = {};

  constructor(private authService: AuthService, private http: HttpClient) {
    this.loggedInUser = this.authService.getLoggedInUsername();
    this.org = this.authService.getLoggedInOrg();
  }

  getCourseClient() {
    this.headers['org'] = 'spinsoft';
    if (this.authService.getToken()) {
      this.headers['Authorization'] = `Bearer ${this.authService.getToken()}`;
    }
    return new CourseClient({
      headers: this.headers,
      environment: environment.ENV,
    });
  }

  getHeaders() {
    let headers = new HttpHeaders();
    headers = headers.set('org', this.authService.getLoggedInOrg());
    return headers;
  }

  getCategories() {
    const url = environment.API_URL + 'v1/categories';
    return this.http.get(url, { headers: this.getHeaders() });
  }

  getCourse(courseId) {
    const url = environment.API_URL + 'v1/courses/' + courseId + '/content';
    return this.http.get(url, { headers: this.getHeaders() });
  }

  getUserCourse(courseId, userId) {
    const url =
      environment.API_URL +
      'v1/usercoursetopics/' +
      courseId +
      '/topics/' +
      userId;
    return this.http.get(url, { headers: this.getHeaders() });
  }
}
