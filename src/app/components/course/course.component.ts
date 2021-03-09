import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from 'src/app/course.service';
import * as _ from 'lodash';
import { DbService } from 'src/app/db.service';
import { AuthService } from 'auth';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent implements OnInit {
  courseId: string;

  @Input()
  course: any;
  courseName: string;
  showSidebar = true;
  reportData = [];
  loggedInUsername: any;

  constructor(
    private authService: AuthService,
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private dbService: DbService,
    public dialog: MatDialog
  ) {
    this.loggedInUsername = this.authService.getLoggedInUsername();
    this.route.params.subscribe((params) => {
      this.courseId = params['id'];
    });
  }

  ngOnInit(): void {
    console.log(this.course);
    //this.loadMenus();
    this.findCourse();
  }

  sections: any;

  findCourse() {
    //this.dbService.getCourse(this.courseId)
    this.courseService.getCourse(this.courseId).subscribe((res) => {
      this.course = res;
      this.createReport(this.course);

      if (this.loggedInUsername) {
        this.findUserCourse();
      }
    });
  }
  usercoursetopics = {};

  findUserCourse() {
    this.courseService
      .getUserCourse(this.courseId, this.loggedInUsername)
      .subscribe((res) => {
        let usercourse: any = res;
        for (let uc of usercourse) {
          this.usercoursetopics[uc.topicId] = uc.status == 'C';
        }

        let completed = usercourse.filter((obj) => obj.status == 'C').length;
        let pending = this.course.noOfTopics - completed;
        let percentage = Math.round((100 * completed) / this.course.noOfTopics);
        console.log(usercourse);
        this.reportData.push({ label: 'Completed', value: completed });
        this.reportData.push({ label: 'Pending', value: pending });
        this.reportData.push({ label: 'Percentage(%)', value: percentage });
      });
  }

  widgetColors = [
    'purple-plum',
    'blue-madison',
    'green-haze',
    'red-intense',
    'blue-madison',
    'red-intense',
  ];

  createReport(course) {
    this.reportData = [];
    this.reportData.push({ label: 'Modules', value: course.modules.length });
    this.reportData.push({ label: 'Topics', value: course.noOfTopics });
  }
}
