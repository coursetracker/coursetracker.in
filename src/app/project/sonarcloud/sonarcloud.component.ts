import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SonarCloudService } from '../sonarcloud.service';

@Component({
  selector: 'app-sonarcloud',
  templateUrl: './sonarcloud.component.html',
  styles: [
  ]
})
export class SonarCloudComponent implements OnInit {

  projectKey:string;

  constructor(private route:ActivatedRoute, private sonarService: SonarCloudService) { 
    this.owner = this.route.snapshot.params["owner"];
    this.repo = this.route.snapshot.params["repo"];
    this.projectKey = this.owner + "_" + this.repo;
    console.log('SonarCloud ' , this.owner +'-' + this.repo);
  }

  ngOnInit(): void {
    //this.getQualityReport();
  }

  @Input()
  owner:string | undefined;

  @Input()
  repo:string | undefined;

  @Input()
  qualityEnabled: boolean = false;

  getBadgeURL(key:any){
    let url = `https://sonarcloud.io/api/project_badges/measure?project=${this.owner}_${this.repo}&metric=${key}`;    
    return url;
  }

  report:any;

  getQualityReport(){
    this.sonarService.list(this.projectKey).subscribe(res=>{
      this.report = res;
    });
  }
}
