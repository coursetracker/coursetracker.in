import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import * as _ from 'lodash';
@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styles: [
  ]
})
export class LeaderboardComponent implements OnInit {

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
  //  this.loadCourses();
    this.loadCourseData();
  }

  courses:any;

  courseData:any;

  loadCourseData(){
    this.courseService.getCourseData().subscribe(res=>{
      let courseData:any = res;
      let completedTopics = courseData.filter( (obj:any)=>obj.status=='C');
      let data = _.groupBy(completedTopics,'user_id');
      let pointsData = [];
      for(let userId of Object.keys(data)){
        let topics = data[userId];
        let courses = _.uniq(topics.map(obj=> obj.course_id)).length;
        let points = 10* topics.length;
        let obj = {user_id: userId, courses: courses, completed: topics.length, points: points};
        pointsData.push(obj);
      }
      console.log(data);
      

      this.courseData = _.orderBy(pointsData, ['points','courses'],['desc']);

    })
  }

  loadCourses(){
    this.courseService.getCourses().subscribe(res=>{
      this.courses = res;
    })
  }

}
