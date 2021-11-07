import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-repo-details',
  templateUrl: './repo-details.component.html',
  styles: [
  ]
})
export class RepoDetailsComponent implements OnInit {


  @Input()
  owner:string = "";

  @Input()
  repo:string = "";

  constructor(private route:ActivatedRoute, private projectService: ProjectService) {

    this.owner = this.route.snapshot.params['owner'];
    this.repo = this.route.snapshot.params['repo'];


   }

  ngOnInit(): void {
    this.loadRepoDetails();
  }

  repository:any;

  loadRepoDetails(){
    this.projectService.getRepository(this.owner, this.repo).subscribe(res=>{
      this.repository = res;
    })
  }

  getColor(commit:any){
    let message=commit.message;
    let color = 'bg-gray-400';
    if(message.startsWith('Merge')){
      color='bg-yellow-400';
    }
    
    return color;
  }

}
