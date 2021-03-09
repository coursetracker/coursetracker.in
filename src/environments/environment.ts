// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_URL: 'http://localhost:8080/api/',
  DB_URL:
    'https://10bd66a9-2a88-4ae9-8854-849290d1bb9e-bluemix.cloudantnosqldb.appdomain.cloud/',
  DB_USERNAME: 'apikey-v2-1ni2bnyzfoegwbtpx3lsitoqwkne4mmgh64r2g5m6x77',
  DB_PASSWORD: '82da6ad6e7071bc68f7c1df3c48048ad',
  ENV: 'DEV',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
