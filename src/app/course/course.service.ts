import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  API_URL = environment.API_URL;
  constructor(private http: HttpClient) { 


  }

  getCourses(){
    let url = "https://coursetracker-courses.s3.ap-south-1.amazonaws.com/chainsys/courses.json";
    return this.http.get(url);
  }
  getCourseData(){
    let url = "https://coursetracker-courses.s3.ap-south-1.amazonaws.com/reports/user_course_topics.json";
    return this.http.get(url);
  }
}
