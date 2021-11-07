import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-tasks',
  templateUrl: './project-tasks.component.html',
  styles: [
  ]
})
export class ProjectTasksComponent implements OnInit {

  projectId:string;

  
  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.projectId = this.route.parent?.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.loadProject();
  }

  project:any;

  tasks1:any;
  
  loadProject() {
    this.projectService.getProject(this.projectId).subscribe((res) => {
      this.project = res;
      this.tasks1  = this.project.tasks;   
    });
  }



  tasks = [
    {name:'Feature 1'},
    {name:'Feature 2'},
    {name:'Feature 3'}
  ]
}
