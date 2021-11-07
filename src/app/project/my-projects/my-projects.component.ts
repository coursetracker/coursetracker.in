import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styles: [
  ]
})
export class MyProjectsComponent implements OnInit {

  userId:string;
  
  constructor(private projectService: ProjectService, private route: ActivatedRoute) {
    this.userId = this.route.snapshot.params["userId"];
   }

  ngOnInit(): void {
    this.loadProjects();
  }

  projects:any;

  loadProjects(){
    this.projectService.getMyProjects(this.userId).subscribe(res=>{
      this.projects = res;
    })
  }

}
