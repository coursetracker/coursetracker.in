import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  apiUrl:string;

  constructor(private http:HttpClient,private authService:AuthService) { 
    this.apiUrl = environment.API_URL;
  }

   getUser(){

    let token = localStorage.getItem("ACCESS_TOKEN");
    let url ="https://api.github.com/user";
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + token);

    return this.http.get(url, {headers:headers});

  }

  createRepo(repoUrl:string){
    let token = localStorage.getItem("ACCESS_TOKEN");
    let url ="https://api.github.com/user/repos";
    let formData = { "name" : repoUrl, "private": false};
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + token);

    return this.http.post(url, formData, {headers:headers});
  }

  getRepos(){

    let token = localStorage.getItem("ACCESS_TOKEN");
    let url ="https://api.github.com/user/repos?per_page=200&type=public";
    
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + token);

    return this.http.get(url, {headers:headers});

  }
  getHeaders(){
    let token = localStorage.getItem("ACCESS_TOKEN");
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + token);
    return headers;
  }

  getUserRepos(username:string){

    let url ="https://api.github.com/users/"+ username + "/repos?per_page=200&type=public";
    console.log(url);
    return this.http.get(url, {headers:this.getHeaders()});

  }

  searchByRepo(q:string){
    let org = 'csys-fresher-batch-2021';
    let url = `https://api.github.com/search/repositories?q=${q}+user:${org}`;
  }



  getRepo(repo:string){
    let url = `https://api.github.com/repos/${repo}`;
    console.log(url);
    return this.http.get(url, {headers:this.getHeaders()});
  }

  getRepoCommits(repo:string){
    let url = `https://api.github.com/repos/${repo}`;
    console.log(url);
    return this.http.get(url, {headers:this.getHeaders()});
  }

  getRepoDetail(repoName:string){
    var url = `${this.apiUrl}v1/github/${repoName}`;    
    return this.http.get(url);
  }

  getRepoEvents(repoName:string){
    var url = `${this.apiUrl}v1/github/${repoName}/events`;    
    return this.http.get(url);
  }

  getUserEvents(userId:string){
    var url = `${this.apiUrl}v1/github/userevents/${userId}`;    
    return this.http.get(url);
  }

  getFiles(url:string){
    return this.http.get(url);
  }


}
