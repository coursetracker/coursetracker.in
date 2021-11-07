import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project-header',
  templateUrl: './project-header.component.html',
  styles: [
  ]
})
export class ProjectHeaderComponent implements OnInit {

  projectId:string;
  constructor(private router: Router, private route:ActivatedRoute) { 
    this.projectId = this.route.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.loadMenus();
  }

  @Input()
  project:any =null;

  menus:any



  loadMenus(){

    this.menus = [
      {name:'Overview', link:'projects/' + this.projectId + '/overview'},
      {name:'Features', link: 'projects/' + this.projectId + '/features'},
      //{name:'Tasks', link: 'projects/' + this.projectId + '/tasks'},
      
    ]
  }

  navigate(menu:any){
    this.router.navigateByUrl(menu.link);
  }

  navigateToGithub(url:string){

    console.log(url);
    let githubUrl = url.replace('https://github.com/','').split("/");
    let owner = githubUrl[0];
    let repo = githubUrl[1];

    this.router.navigateByUrl(`projects/${this.projectId}/repositories/${owner}/${repo}`);
  }

  navigateToSonar(url:string){

    console.log(url);
    let githubUrl = url.replace('https://github.com/','').split("/");
    let owner = githubUrl[0];
    let repo = githubUrl[1];

    this.router.navigateByUrl(`projects/${this.projectId}/repositories/${owner}/${repo}/quality`);
  }

}
