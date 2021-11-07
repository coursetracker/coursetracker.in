import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-user-course-report',
  templateUrl: './user-course-report.component.html',
  styles: [
  ]
})
export class UserCourseReportComponent implements OnInit {

  userId:string;
 
  constructor(private route:ActivatedRoute, private courseService: CourseService) {
    this.userId = this.route.snapshot.params["userId"];
   }

  ngOnInit(): void {
    this.loadCourses();
    
  }

  categories:any;

  courseData:any;

  loadCourseData(){
    this.courseService.getCourseData().subscribe((res:any)=>{
      let courseData:any = res.filter((obj:any)=>obj.user_id == this.userId );
      let completedTopics = courseData.filter( (obj:any)=>obj.status=='C');
      let data = _.groupBy(completedTopics,'course_id');
      let pointsData = [];
      for(let category of this.categories){

        let completedCoursesIds = _.uniq(completedTopics.map((obj:any)=>obj.course_id));
        console.log(completedCoursesIds);
        let courses = category.courses.filter((obj:any)=> completedCoursesIds.includes(obj.code));
        console.log(courses);
        let courseIds = category.courses.map((obj:any)=>obj.code);
        
        let topics = completedTopics.filter((obj:any)=> courseIds.includes(obj.course_id));
        let points = 10* topics.length;
        category.enrolledCourses = courses;
        let obj = {category: category,  completed: topics.length, points: points};
        pointsData.push(obj);
      }
      console.log(data);
      

      this.courseData = _.orderBy(pointsData, ['points'],['desc']);

    })
  }

  loadCourses(){
    this.courseService.getCourses().subscribe((res:any)=>{
      this.categories = res["categories"];
      this.loadCourseData();
    })
  }

  getCourseNames(category:any){
    let courseNames = category.enrolledCourses.map((obj:any)=>obj.title).join(', ');
    return courseNames;
    
  }
}
