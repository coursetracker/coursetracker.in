import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'auth';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  menus: any = [];
  user: any;
  constructor(private router: Router, private authService: AuthService) {
    this.user = this.authService.getLoggedInUsername();
    if (this.user) {
      this.router.navigate([this.user + '/courses']);
    }
  }
  public theme: any = environment.theme;

  ngOnInit(): void {
    this.loadMenus();
  }

  processing = false;

  email: string;
  username: string;

  search() {
    this.processing = true;
    if (this.email) {
      let user = {
        id: this.email,
        username: this.email,
        name: this.email,
        roles: ['U', 'T'],
      };
      localStorage.setItem('SELECTED_USER', this.email);
      localStorage.setItem('LOGGED_IN_USER', JSON.stringify(user));
      this.router.navigate([this.email + '/courses']);
    }
    this.processing = false;
  }

  loadMenus() {
    this.menus = [];
    this.menus.push({
      title: 'Home',
      path: ['../../dashboard'],
      icontype: 'fas fa-home',
      access: true,
    });
    this.menus.push({
      title: 'Projects',
      path: ['../'],
      icontype: 'fas fa-laptop',
      access: true,
    });
  }
}
