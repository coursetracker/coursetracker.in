import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CurriculumService } from 'src/app/curriculum.service';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styles: [
  ]
})
export class CurriculumComponent implements OnInit {


 
  courseId: string;

  constructor(
    private projectService: CurriculumService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.courseId = this.route.snapshot.params["id"];
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

  printPage(){
    window.print();
  }

}
