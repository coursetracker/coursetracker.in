import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CurriculumService } from 'src/app/curriculum.service';

@Component({
  selector: 'app-curriculum-view',
  templateUrl: './curriculum-view.component.html',
  styles: [
  ]
})
export class CurriculumViewComponent implements OnInit {

 
  courseId: string;

  constructor(
    private projectService: CurriculumService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.courseId = this.route.parent?.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.loadProject();
  }

  course: any;

  loadProject() {
    this.projectService.getCourse(this.courseId).subscribe((res) => {
      this.course = res;
    });
  }

  addModule() {
    let moduleNames = prompt("Enter Module Name");
    // if (moduleNames && moduleNames.length > 0) {
    //   let modules = moduleNames.split(',');
    //   for(let m of modules){
    //     let module = { name: m };
    //     this.projectService
    //       .addProjectModule(this.courseId, module)
    //       .subscribe((res) => {
    //         this.toastr.success('Successfully Added');
    //         //this.refresh();
    //         this.loadProject();
    //       });
    //     }
    // }
  }

  task: any = { name: null };

  addTask(moduleId: string, task: any) {
    // this.projectService
    //   .addProjectFeature(this.courseId, moduleId, task)
    //   .subscribe((res) => {
    //     console.log(res);
    //   });
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
    // this.projectService
    //   .addProjectFeature(this.courseId, moduleId, feature)
    //   .subscribe((res) => {
    //     console.log(res);

    //     this.toastr.success("Successfully Updated");
    //     this.feature = {
    //       projectModule: { id: null },
    //       name: null,
    //       startDate: this.today,
    //       completionDate: this.today,
    //     };
    //     this.loadProject();
    //   });
  }

  addProjectRepository() {
    let repoUrl = prompt("Enter Github Repo Url");
    if (repoUrl != null && repoUrl.length > 20) {
      // this.projectService
      //   .addProjectRepository(this.project, repoUrl)
      //   .subscribe((res:any) => {
      //     console.log(res);
      //     this.loadProject();
      //   });
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

  getTopics(topics:any){
    const topicNames = topics.map((obj:any)=>obj.name);
    return topicNames.join(" , ");
  }

  printPage(){
    window.print();
  }
}

