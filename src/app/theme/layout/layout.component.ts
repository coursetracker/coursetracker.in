import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'Layout',
  templateUrl: './layout.component.html',
  styles: [
  ]
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  showHeader:boolean = true;

  @Input()
  toggleNav:boolean = false;

  @Input()
  isNavOpen:boolean = false;

  @Input()
  title:string  = "";


}
