import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from 'src/app/course.service';
import * as _ from 'lodash';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

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

  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {
    this.route.params.subscribe((params) => {
      this.courseId = params['id'];
    });
  }

  ngOnInit(): void {
    console.log(this.course);
    //this.loadMenus();
    this.findCourse();
    this.listModules();
  }

  sections: any;

  findCourse() {
    this.courseService
      .getCourseClient()
      .findOne(this.courseId)
      .then((res) => {
        this.course = res;
      });
  }

  topics: any;

  modules: any;

  moduleTopics = {};

  listModules() {
    this.courseService
      .getCourseClient()
      .listModules(this.courseId)
      .then((res) => {
        this.modules = res;
        this.listTopics();
      });
  }

  listTopics() {
    console.log('listTopics:' + this.courseId);
    this.courseService
      .getCourseClient()
      .listTopics(this.courseId)
      .then((res) => {
        this.moduleTopics = res;
      });
  }

  selectedModule: any;
}
