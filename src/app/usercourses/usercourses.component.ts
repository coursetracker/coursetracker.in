import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from '../course.service';
import { DbService } from '../db.service';

@Component({
  selector: 'app-usercourses',
  templateUrl: './usercourses.component.html',
  styleUrls: ['./usercourses.component.css'],
})
export class UsercoursesComponent implements OnInit {
  breadcrumbItems = [
    { icon: 'home', name: 'Home', link: '/' },
    { name: 'Courses' },
  ];

  showSidebar = true;
  loggedInUser: any;

  constructor(
    public dialog: MatDialog,
    private courseService: CourseService,
    //private authService: AuthService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CourseService
  ) {
    this.route.params.subscribe((params) => {
      this.loggedInUser = params['username'];
    });
    //this.loggedInUser = this.authService.getUser();

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
      //.getCourseClient()
      //.list()
      .getUserCourses(this.loggedInUser)
      .subscribe((res) => {
        this.courses = res;
        let i = 0;
        for (let course of this.courses) {
          let percentage = Math.round(
            (100 * course.completed_topics) / course.no_of_topics
          );
          this.courses[i]['pending'] =
            course.no_of_topics - course.completed_topics;
          this.courses[i]['percentage'] = percentage;
          i++;
        }
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
    'green-haze',
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
      return sum + obj.no_of_topics;
    }, 0);
    let completedTopics = courses.reduce(function (sum, obj) {
      return sum + obj.completed_topics;
    }, 0);
    let percentage = Math.round((100 * completedTopics) / topics);
    this.reportData.push({ label: 'Courses', value: total });
    this.reportData.push({ label: 'Category', value: categories });
    this.reportData.push({
      label: 'Topics',
      value: topics,
    });
    this.reportData.push({
      label: 'Completed',
      value: completedTopics,
    });
    this.reportData.push({ label: 'Pending', value: completedTopics });
    this.reportData.push({ label: 'Percentage(%)', value: percentage });
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
