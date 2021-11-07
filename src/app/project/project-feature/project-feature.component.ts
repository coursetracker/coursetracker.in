import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { ProjectService } from "../project.service";

@Component({
  selector: "app-project-feature",
  templateUrl: "./project-feature.component.html",
  styles: [],
})
export class ProjectFeatureComponent implements OnInit {
  mode = "view";

  projectId: string;

  project: any;

  featureId:string;

  moduleId:string = "";

  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.projectId = this.route.parent?.snapshot.params["id"];
    this.featureId = this.route.snapshot.params["featureId"];
  }

  ngOnInit(): void {
    this.loadProject();
  }

  feature:any;

  loadProject() {
    this.projectService.getProject(this.projectId).subscribe((res) => {
      this.project = res;
      for(let m of this.project.modules){
        this.moduleId = m._id;
        let feature:any = m.features.find((obj:any)=> obj._id == this.featureId);        
        if(feature != null){
          this.feature  = feature;
          
          break;
        }
      }
    });
  }

  today: string = new Date().toJSON().substr(0, 10);


  updateFeature(moduleId: string, feature: any) {
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

  deleteFeature(){
    let cfm = confirm("Do you want to delete feature ?");
    if(cfm){
      this.projectService.deleteFeature(this.projectId, this.moduleId , this.featureId).subscribe(res=>{
        this.toastr.success("Successfully Updated");
        this.router.navigateByUrl('projects/' + this.projectId + "/features");
      })
    }
  }

  updateStatus(status:string){
    //let cfm = confirm("Do you want to update the status to  " + status + " ?");
    //if(cfm){
      this.projectService.updateFeatureStatus(this.projectId, this.moduleId , this.featureId, status).subscribe(res=>{
        
        this.feature.status= status;
        if(status=='COMPLETED' || status =='PENDING'){
          this.router.navigateByUrl('projects/' + this.projectId +"/features");
        }
        
        
      })
    //}
  }

  updateFeatureDescription(){
    console.log(this.feature.description);
    this.mode = 'view';
  }

  taskTypes = [ 
    {name:'UI'},
    {name:'Validation'},
    {name:'Functionality'},
    {name:'Test Cases'},    
    {name:'Testing'}, 
    {name:'CodeQuality'},    
  ]
}
