import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-feature-list',
  templateUrl: './feature-list.component.html',
  styles: [
  ]
})
export class FeatureListComponent implements OnInit {

  projectId: string;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.projectId = this.route.parent?.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.loadProject();
  }

  project: any;

  loadProject() {
    this.projectService.getProject(this.projectId).subscribe((res) => {
      this.project = res;
    });
  }

  addModule() {
    let moduleNames = prompt("Enter Module Name");
    if (moduleNames && moduleNames.length > 0) {
      let modules = moduleNames.split(',');
      for(let m of modules){
        let module = { name: m };
        this.projectService
          .addProjectModule(this.projectId, module)
          .subscribe((res) => {
            this.toastr.success('Successfully Added');
            //this.refresh();
            this.loadProject();
          });
        }
    }
  }

  task: any = { name: null };

  addTask(moduleId: string, task: any) {
    this.projectService
      .addProjectFeature(this.projectId, moduleId, task)
      .subscribe((res) => {
        console.log(res);
      });
  }

  selectedModule: string = "";

  today: string = new Date().toJSON().substr(0, 10);

  feature: any = {
    projectModule: { id: null },
    name: null,
    startDate: this.today,
    completionDate: this.today,
  };

  mode: string = "view";

  addFeature(moduleId: string, feature: any) {
    this.projectService
      .addProjectFeature(this.projectId, moduleId, feature)
      .subscribe((res) => {
        console.log(res);

        this.toastr.success("Successfully Updated");
        this.feature = {
          projectModule: { id: null },
          name: null,
          startDate: this.today,
          completionDate: this.today,
        };
        this.loadProject();
      });
  }

  addProjectRepository() {
    let repoUrl = prompt("Enter Github Repo Url");
    if (repoUrl != null && repoUrl.length > 20) {
      this.projectService
        .addProjectRepository(this.project, repoUrl)
        .subscribe((res:any) => {
          console.log(res);
          this.loadProject();
        });
    }
  }

  reset(){
    this.selectedModule='';
    this.mode='view';
  this.feature = {
    projectModule: { id: null },
    name: null,
    startDate: this.today,
    completionDate: this.today,
  };
  }
}
