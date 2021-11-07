import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { GithubService } from 'src/app/github.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  code:string = "";
  accessToken:string = "";

  constructor(private route: ActivatedRoute, private router:Router, private authService: AuthService, private githubService: GithubService){
    this.route.queryParams.subscribe ( params =>{
      this.code = params['code'];
      this.accessToken = params["access_token"];
      console.log("login:" + this.code);
      console.log("accessToken:" + this.accessToken);
    });
  }

  ngOnInit(): void {
    if ( this.code){
      //this.getToken();
    }
    if(this.accessToken){
      localStorage.setItem("ACCESS_TOKEN", this.accessToken);

      this.getUser();
      //this.router.navigate(['projects']);

    }
  }

  

  getUser(){

    this.githubService.getUser().subscribe ((res:any)=>{


      let username = res["login"];
      let user = { "id": res["id"], "username": res["login"] , "githubUsername": res["login"],
      "name": res["name"],"email" : res["email"], "type": res["type"],
    "created_at": res["created_at"] , "gravatar_id": res["gravatar_id"],
  "avatar_url": res["avatar_url"] , "role":"U"};
  
      this.authService.findOne(username).subscribe( (data:any) =>{
        if(data){
          user["username"] = data["username"];
          user["role"] = data["role"];
          user["name"] = data["name"];
        }
        localStorage.setItem("LOGGED_IN_USER", JSON.stringify(user));  
        this.router.navigate (['projects']);    
      });


    });
      

  }


  getRepos(){

    let token = localStorage.getItem("ACCESS_TOKEN");
    let url ="https://api.github.com/user/repos";
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', "Bearer " + token);

   // this.http.get(url, {headers:headers}).subscribe ( res=>{
     // console.log(res);
      //sessionStorage.setItem("REPOSITORIES", JSON.stringify(res));
      
    //});

  }

  user =  {email: null, password: null};


  loadUserProfile(): void {
    
  }
}
