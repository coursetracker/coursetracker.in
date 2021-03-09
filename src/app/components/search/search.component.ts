import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  menus: any = [];
  constructor() {}

  ngOnInit(): void {
    this.loadMenus();
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
