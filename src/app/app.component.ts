import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'CourseTracker';
  headerColor = '#2b3643';
  siteInfo: any;

  user: any;

  users = ['guru', 'dharani'];
  courses: any;

  constructor() {
    //this.user = this.authService.getUser();
    //this.isLoggedIn = this.user != null;
  }

  selectedUser: any;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('LOGGED_IN_USER'));
    sessionStorage.setItem('SITE_INFO', JSON.stringify(environment.theme));
  }

  isLoggedIn: boolean = false;

  headerMenus = [];

  getHeaderMenus() {
    this.headerMenus = [];
    this.headerMenus.push({
      name: 'Search',
      link: ['search'],
      icon: 'fas fa-search',
      access: true,
    });
    if (this.user) {
      this.headerMenus.push({
        name: 'My Courses',
        link: [this.user.username + '/courses'],
        icon: 'fas fa-book-open',
        access: true,
      });
    } else {
      this.headerMenus.push({
        name: 'My Courses',
        link: ['courses'],
        icon: 'fas fa-book-open',
        access: true,
      });
    }
    return this.headerMenus;
  }
}
