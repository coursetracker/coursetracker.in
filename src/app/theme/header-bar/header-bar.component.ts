import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'HeaderBar',
  templateUrl: './header-bar.component.html',
  styles: [
  ]
})
export class HeaderBarComponent implements OnInit {

  constructor(public authService: AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  @Input()
  showHeader:boolean = true;

  @Input()
  toggleNav:boolean = false;

  @Input()
  isNavOpen:boolean = false;

  @Input()
  title:string= "";

  onToggleNav(toggleNav:boolean){
    this.toggleNav = !toggleNav;
  }

  menus = [
  {name:'Courses', link:'courses'},
  {name:'Leaderboard', link:'coursereport'}  
  ]

  authorize_url =`https://github.com/login/oauth/authorize?client_id=${environment.github_client_id}&redirect_uri=${environment.github_redirect_uri}&scope=user%20repo&state=123`;
  //authorize_url =`https://github.com/login/oauth/authorize?client_id=${environment.github_client_id}`;

  navigate(url:string){
    if(url =="login"){
      
      window.location.href=this.authorize_url;

    }
    else{
    this.router.navigateByUrl(url);
    }
  }


  logout(){
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigateByUrl("/");
  }





}
