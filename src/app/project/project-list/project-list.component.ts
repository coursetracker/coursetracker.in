import { Component, ElementRef, OnInit, Renderer2 } from "@angular/core";
import * as _ from "lodash";
import { ProjectService } from "../project.service";
import * as confetti from "canvas-confetti";

@Component({
  selector: "app-project-list",
  templateUrl: "./project-list.component.html",
  styles: [],
})
export class ProjectListComponent implements OnInit {
  constructor(
    private renderer2: Renderer2,
    private elementRef: ElementRef,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  projectList: any;
  projects: any;

  loadProjects() {
    this.projectService.getProjects().subscribe((res) => {
      this.projectList = res;

      for (let i = 0; i < this.projectList.length; i++) {
        let p = this.projectList[i];

        this.projectList[i].totalFeatures = this.getFeaturesCount(p);
        this.projectList[i].completedFeatures =
          this.getFeaturesCompletedCount(p);
        if (this.projectList[i].completedFeatures > 0) {
          this.projectList[i].percentage = Math.round(
            (100 * this.projectList[i].completedFeatures) /
              this.projectList[i].totalFeatures
          );
        } else {
          this.projectList[i].percentage = 0;
        }
      }
      this.projectList = _.orderBy(
        this.projectList,
        ["percentage", "features"],
        ["desc"]
      );
      this.projects = this.projectList;
    });
  }

  setStudentSearch(event: any) {
    let userId = event.target.value;
    console.log("userId", userId);
    if (userId != null && userId != "") {
      this.projects = this.projects.filter((obj: any) =>
        obj.assignedTo.toLowerCase().includes(userId.toLowerCase())
      );
    } else {
      this.projects = this.projectList;
    }
  }

  setProjectSearch(event: any) {
    let projectName = event.target.value;
    console.log(projectName);
    if (projectName != null && projectName != "") {
      this.projects = this.projects.filter((obj: any) =>
        obj.name.toLowerCase().includes(projectName.toLowerCase())
      );
    } else {
      this.projects = this.projectList;
    }
  }

  getFeaturesCount(project: any) {
    let total = 0;
    for (let m of project.modules) {
      total += m.features.length;
    }
    return total;
  }
  getFeaturesCompletedCount(project: any) {
    let total = 0;
    for (let m of project.modules) {
      total += m.features.filter(
        (obj: any) => obj.status == "COMPLETED"
      ).length;
    }
    return total;
  }

  clicked = false;
  complete() {
    const canvas = this.renderer2.createElement("canvas");
   this.renderer2.appendChild(this.elementRef.nativeElement, canvas);

    // confetti({
    //   particleCount:100,
    //   spread:70,
    //   origin: { y:0.6}
    // });

    const myConfetti = confetti.create(canvas, {
      resize: true,
    });

    myConfetti();
    setTimeout(()=>{
      myConfetti.reset();
    },5000);
    this.clicked = true;

  }
}
