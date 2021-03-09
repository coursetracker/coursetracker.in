import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'auth';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from 'src/app/course.service';
import { AddCourseComponent } from '../add-course/add-course.component';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css'],
})
export class CourseListComponent implements OnInit {
  breadcrumbItems = [
    { icon: 'home', name: 'Home', link: '/' },
    { name: 'Courses' },
  ];

  showSidebar = true;
  loggedInUser: any;

  constructor(
    public dialog: MatDialog,
    private courseService: CourseService,
    private authService: AuthService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CourseService
  ) {
    this.loggedInUser = this.authService.getUser();

    this.route.queryParams.subscribe((params) => {
      this.selectedCategory = params['category'] ? params['category'] : 'ALL';
      console.log(this.selectedCategory);
    });
  }

  ngOnInit(): void {
    this.listCategories();
    this.list();
    //this.listCategories();
  }

  courses: any;

  selectedCategory: string;

  courseMap: any = {};

  categories: any = [];
  filteredCategories = [];
  filteredCourses = {};

  categoryList: any;

  getCategories() {
    return this.categories.filter((c) => c.completed);
  }

  listCategories() {
    this.courseService.getCategories().subscribe((res) => {
      console.log(res);
      this.categoryList = res;
    });
  }

  list() {
    //this.courseService.list()
    this.courseService
      .getCourseClient()
      .list()
      .then((res) => {
        this.courses = res;
        this.courses.filter((c) => {
          if (this.categories.find((ct) => ct.name == c.category) == null) {
            this.categories.push({ name: c.category, completed: true });
          }
        });
        this.loadMenus(this.categories);
        this.filterCourses();
      });
  }

  filterCourses() {
    //this.categories.unshift('ALL');
    console.log(this.categories);
    this.filteredCourses = {};
    let categories = this.categories.filter((c) => c.completed);
    console.log(categories.length);
    for (let category of categories) {
      this.filteredCourses[category.name] = this.courses.filter(
        (c) => c.category == category.name
      );
    }
    this.createReport(this.filteredCourses, categories.length);
  }

  reportData: any = [];
  widgetColors = [
    'purple-plum',
    'blue-madison',
    'green-haze',
    'red-intense',
    'blue-madison',
    'red-intense',
  ];

  createReport(data, categories) {
    this.reportData = [];
    let courses = [];
    for (let category in data) {
      let courseList = data[category];
      courses.push(...courseList);
    }
    let total = courses.length;

    let topics = courses.reduce(function (sum, obj) {
      return sum + obj.noOfTopics;
    }, 0);
    this.reportData.push({ label: 'Courses', value: total });
    this.reportData.push({ label: 'Category', value: categories });
    this.reportData.push({ label: 'Topics', value: topics });
  }

  menus: any;

  navigate(category) {
    this.router.navigateByUrl('courses?category=' + category);
  }
  updateCategoryFilter(ct, checked) {
    this.filterCourses();
  }

  publish(course) {
    this.courseService
      .getCourseClient()
      .publish(course.code)
      .then((res) => {
        console.log(res);
        this.toastr.success('Published Successfully');
        course.status = 'PUBLISHED';
      });
  }

  loadMenus(categories) {
    this.menus = [];
    for (let c of categories) {
      this.menus.push({
        title: c,
        path: ['../'],
        icontype: 'fas fa-book-open',
        access: true,
      });
    }
  }

  courseFilter: string;
}
