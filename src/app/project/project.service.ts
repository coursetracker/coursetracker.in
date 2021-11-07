import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  API_URL  =  environment.API_URL;
  constructor(private http: HttpClient) {
  }

  getProjects(){
    let url = `${this.API_URL}v1/projects`;
    return this.http.get(url);
  }

  
  getMyProjects(userId:string){
    let url = `${this.API_URL}v1/projects?userId=${userId}`;
    return this.http.get(url);
  }

  getProject(id:string){
    let url = `${this.API_URL}v1/projects/${id}`;
    return this.http.get(url);
  }

  addProject(project:any){
    let url = `${this.API_URL}v1/projects`;
    return this.http.post(url, project);
  }

  
  addProjectModule(id:string, module:any){
    let url = `${this.API_URL}v1/projects/${id}/modules`;
    return this.http.post(url, module);
  }

  addProjectFeature(id:string, moduleId:string, feature:any){
    let url = `${this.API_URL}v1/projects/${id}/modules/${moduleId}/features`;
    return this.http.post(url, feature);
  }

  deleteFeature(id:string, moduleId:string, featureId:string){
    let url = `${this.API_URL}v1/projects/${id}/modules/${moduleId}/features/${featureId}`;
    return this.http.delete(url);
  }

  
  deleteModule(id:string, moduleId:string){
    let url = `${this.API_URL}v1/projects/${id}/modules/${moduleId}`;
    return this.http.delete(url);
  }

  deleteProject(id:string){
    let url = `${this.API_URL}v1/projects/${id}`;
    return this.http.delete(url);
  }

 updateFeatureStatus(id:string, moduleId:string, featureId:string,status:string){
    let url = `${this.API_URL}v1/projects/${id}/modules/${moduleId}/features/${featureId}`;
    return this.http.patch(url,{status:status});
  }

  updateSettings(id:string, project:any){
    let url = `${this.API_URL}v1/projects/${id}`;
    return this.http.patch(url,project);
  }

  addProjectRepository(id:string, repoName:string){
    let url = `${this.API_URL}v1/projects/${id}/repositories`;
    return this.http.post(url,{name:repoName});
  }

  getRepository(owner:string, repo:string){
    let url = `${this.API_URL}v1/github/${owner}/${repo}`;
    return this.http.get(url);
  }
}
