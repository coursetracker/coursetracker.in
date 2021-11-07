import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ProjectService } from "../project.service";

@Component({
  selector: "app-view-project",
  templateUrl: "./view-project.component.html",
  styles: [],
})
export class ViewProjectComponent implements OnInit {
  projectId: string;

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.projectId = this.route.snapshot.params["id"];
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
    let moduleName = prompt("Enter Module Name");
    if (moduleName && moduleName.length > 0) {
      let module = { name: moduleName };
      this.projectService
        .addProjectModule(this.projectId, module)
        .subscribe((res) => {
          //this.toastr.success('Successfully Added');
          //this.refresh();
          this.loadProject();
        });
      console.log(moduleName);
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
        .subscribe((res) => {
          console.log(res);
          this.loadProject();
        });
    }
  }
}
