import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'user-header',
  templateUrl: './user-header.component.html',
  styles: [
  ]
})
export class UserHeaderComponent implements OnInit {

  @Input()
  user:any;

  project:any = {}
  constructor() { }

  ngOnInit(): void {
  }

  menus:any=[];

  loadMenus(){

  }

}
