import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-project-settings',
  templateUrl: './project-settings.component.html',
  styles: [
  ]
})
export class ProjectSettingsComponent implements OnInit {

  mode = "view";

  projectId: string;

  project: any;

  featureId:string;

  moduleId:string = "";

  constructor(
    private projectService: ProjectService,
    private authService: AuthService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.projectId = this.route.parent?.snapshot.params["id"];
    this.featureId = this.route.snapshot.params["featureId"];
  }

  ngOnInit(): void {
    this.loadProject();
  }

  feature:any;

  developer = { name: null, email: null};

  addDeveloper(developer:any){
    let developers:any = this.project.developers ? this.project.developers : [];
    developers.push(developer);
    this.project.developers = developers;
    this.developer = { name: null, email: null};
    this.toastr.success("Successfully Updated");
  }

  loadProject() {
    this.projectService.getProject(this.projectId).subscribe((res) => {
      this.project = res;
      //this.project.developers = [{name:"Naresh", email:"nareshkumarh@live.com"}];
      for(let m of this.project.modules){
        this.moduleId = m._id;
        let feature = m.features.find((obj:any)=> obj._id == this.featureId);
        if(feature != null){
          this.feature  = feature;
          break;
        }
      }
    });
  }

  today: string = new Date().toJSON().substr(0, 10);


  updateSettings(){
    
    console.log(this.project);
      this.projectService.updateSettings(this.projectId, this.project).subscribe(res=>{
        //this.router.navigateByUrl('projects/' + this.projectId);
        console.log(res);
        this.toastr.success("Successfully Updated");
        this.router.navigateByUrl('projects/' + this.projectId  +"/features");    
      });
    
  }

}
