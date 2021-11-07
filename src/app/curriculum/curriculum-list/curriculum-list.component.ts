import { Component, OnInit } from '@angular/core';
import { CurriculumService } from 'src/app/curriculum.service';

@Component({
  selector: 'app-curriculum-list',
  templateUrl: './curriculum-list.component.html',
  styles: [
  ]
})
export class CurriculumListComponent implements OnInit {
  constructor(
    private projectService: CurriculumService
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  orgCourses:any;
  courseList: any;
  courses: any;

  loadCourses() {
    this.projectService.getCourses().subscribe((res:any) => {
      this.orgCourses =res;
      this.courses = [];
      for(let category of this.orgCourses.categories){
        this.courses.push(...category.courses);
      }

      // this.courses = res;
      this.courseList = this.courses;
    });
  }

  setStudentSearch(event: any) {
    let userId = event.target.value;
    console.log("userId", userId);
    if (userId != null && userId != "") {
      this.courses = this.courses.filter((obj: any) =>
        obj.assignedTo.toLowerCase().includes(userId.toLowerCase())
      );
    } else {
      this.courses = this.courseList;
    }
  }

  setProjectSearch(event: any) {
    let searchKey = event.target.value.toLowerCase();
    console.log(searchKey);
    if (searchKey != null && searchKey != "") {
      this.courses = this.courseList.filter((obj: any) =>
        obj.code.toLowerCase().includes(searchKey)  || obj.title.toLowerCase().includes(searchKey)
      );
    } else {
      this.courses = this.courseList;
    }
  }

  getFeaturesCount(project: any) {
    let total = 0;
    for (let m of project.modules) {
      total += m.features.length;
    }
    return total;
  }
  getFeaturesCompletedCount(project: any) {
    let total = 0;
    for (let m of project.modules) {
      total += m.features.filter(
        (obj: any) => obj.status == "COMPLETED"
      ).length;
    }
    return total;
  }

  clicked = false;
  complete() {
    
    this.clicked = true;

  }
}
