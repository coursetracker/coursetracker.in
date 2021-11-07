import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'badge',
  templateUrl: './badge.component.html',
  styles: [
  ]
})
export class BadgeComponent implements OnInit {

  constructor() { 
    
  }

  ngOnInit(): void {
  }

  @Input()
  badges:any;


  getBadges(){
    let badgeList = this.badges ? this.badges: [];
    return badgeList;
  }



}
