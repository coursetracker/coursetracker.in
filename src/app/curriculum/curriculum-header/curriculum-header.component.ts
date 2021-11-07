import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-curriculum-header',
  templateUrl: './curriculum-header.component.html',
  styles: [
  ]
})
export class CurriculumHeaderComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loadMenus();
  }

  isNavOpen: boolean = false;

  toggleNav = false;

  onToggleNav(toggleNav: boolean) {
    this.toggleNav = !toggleNav;
  }

  menus: any;

  loadMenus() {
    this.menus = [
      { name: 'Curriculum', link: 'courses/' + this.course.code + "/curriculum" },
      // { name: 'Users', link: 'courses/' + this.course.code + "/users" },
      { name: 'Leaderboard', link: 'courses/' + this.course.code + "/leaderboard" },
      // { name: 'Mentors', link: 'courses/' + this.course.code + "/mentors" },

    ]
  }

  navigate(url: string) {

    this.router.navigateByUrl(url);

  }


  @Input()
  course: any;
}
