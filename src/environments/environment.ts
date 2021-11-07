// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_URL :"https://coursetracker-courses.s3.ap-south-1.amazonaws.com",
  //github_redirect_uri : "https://projecttracker.in/login",
  github_redirect_uri : "https://api.projecttracker.in/api/oauth/callback",
  //github_redirect_uri : "http://localhost:3000/api/oauth/callback",
  github_client_id : "38c9071df1e6c6b1f96f"

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
