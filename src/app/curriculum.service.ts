import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurriculumService {

  API_URL = environment.API_URL;
  orgId = "spinsoft";
  constructor(private http: HttpClient) { }

  getCourses(){
    const url = `${this.API_URL}/${this.orgId}/courses.json`;
    return this.http.get(url);
  }

  
  getCourse(courseId:string){
    const url = `${this.API_URL}/${this.orgId}/${courseId}.json`;
    return this.http.get(url);
  }
}
