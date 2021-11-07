import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class SonarCloudService {
  apiUrl: string;
  //455b2c10ab2c0dc99eeafd681b3887d0243fc7df
  apiKey = "187eacd27437b7d5a91e603685047cb75f98a2a1";

  sonarcloudUrl = "https://sonarcloud.io/api/";

  constructor(private http: HttpClient) {
    this.apiUrl = environment.API_URL;
  }

  getHeaders() {
    let headers = new HttpHeaders();
    headers.set("Accept", "application/json");
    let token = window.btoa(this.apiKey + ":");
    headers.set("Authorization", "Bearer " + token);
    return headers;
  }

  list(batchId: any) {
    let url =
      this.sonarcloudUrl +
      "projects/search?organization=csys-fresher-batch-2021";
    return this.http.get(url, { headers: this.getHeaders() });
  }

  findProjects(org: any, projects: any) {
    let url =
      this.sonarcloudUrl +
      `projects/search?organization=${org}&projects=${projects}`;
    return this.http.get(url, { headers: this.getHeaders() });
  }

  findProject(projectKey: string) {
    let url =
      this.sonarcloudUrl +
      `measures/component_tree?component=${projectKey}&metricKeys=violations,code_smells,ncloc`;
    return this.http.get(url,{ headers: this.getHeaders() });
  }
}
