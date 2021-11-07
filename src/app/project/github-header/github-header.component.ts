import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-github-header',
  templateUrl: './github-header.component.html',
  styles: [
  ]
})
export class GithubHeaderComponent implements OnInit {

  constructor() { }

  project = {};

  @Input()
  repository:any;

  ngOnInit(): void {
  }

  menus =[
    { name: 'Issues', link:''},
    { name: 'Branches', link:''}
  ]

}
