import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl:string;
  constructor(private http:HttpClient) { 
    this.apiUrl = environment.API_URL;
  }

  


  login(user:any){
    let url = this.apiUrl + "v1/auth/login";
    return this.http.post(url, user);    
  }

  
  findOne(userId:string){
    let url = this.apiUrl + "v1/users/" + userId;
    return this.http.get(url);    
  }

  getLoggedInUsername(){
    let user = localStorage.getItem("LOGGED_IN_USER");
    let username = null;
    if (user){
      username = JSON.parse(user).username;
    }
    return username;
  }

  isAuthorized(){
    let userStr = localStorage.getItem("LOGGED_IN_USER");
    let user = userStr != null ? JSON.parse(userStr):null;    
    if (user && user.id){
        return true;      
    }
    return false;
  }
  
  getUser():any{
    let userStr = localStorage.getItem("LOGGED_IN_USER");
    let user = userStr != null ? JSON.parse(userStr):null;    
    return user;
  }

  isLoggedIn():boolean{
    const user = this.getUser();    
    return this.getUser() != null;
  }

  storeUser(res:any){
    let username = res["login"];
    let user = { "id": res["id"], "username": res["login"] , "githubUsername": res["login"],
    "name": res["name"],"email" : res["email"], "type": res["type"],
  "created_at": res["created_at"] , "gravatar_id": res["gravatar_id"],
"avatar_url": res["avatar_url"] , "role":"U","mode":"github"};

    this.findOne(username).subscribe( (data:any) =>{
      if(data){
        user["username"] = data["username"];
        user["role"] = data["role"];
        user["name"] = data["name"];
        
      }
      localStorage.setItem("LOGGED_IN_USER", JSON.stringify(user));      
    });
    
  }
}
