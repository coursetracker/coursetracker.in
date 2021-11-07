import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { CourseService } from 'src/app/course/course.service';

@Component({
  selector: 'app-curriculum-leaderboard',
  templateUrl: './curriculum-leaderboard.component.html',
  styles: [
  ]
})
export class CurriculumLeaderboardComponent implements OnInit {


  courseId:string;
 
  constructor(private route:ActivatedRoute, private router: Router,private courseService: CourseService) {
    this.courseId = this.route.parent?.snapshot.params["id"];
   }

  ngOnInit(): void {
    this.loadCourses();
    
  }

  categories:any;

  courseData:any;

  loadCourseData(){
    this.courseService.getCourseData().subscribe((res:any)=>{
      let courseData:any = res.filter((obj:any)=> obj.course_id == this.courseId);
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
    this.courseService.getCourses().subscribe((res:any)=>{
      this.categories = res["categories"];
      this.loadCourseData();
    })
  }

  getCourseNames(category:any){
    let courseNames = category.enrolledCourses.map((obj:any)=>obj.title).join(', ');
    return courseNames;
    
  }

  
  printPage(){
    window.print();
  }


  navigateToUrl(url:string){
    this.router.navigateByUrl(url);
  }
  
}


