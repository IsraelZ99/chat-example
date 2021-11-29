// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const tokenIsrael = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJpc3JhZWwuZ2FyY2lhIiwiYXV0aG9yaXRpZXMiOlt7ImF1dGhvcml0eSI6InJvbGU6Y3J1ZCJ9LHsiYXV0aG9yaXR5IjoiUk9MRV9BRE1JTklTVFJBRE9SIn0seyJhdXRob3JpdHkiOiJzb3VyY2U6Y3JlYXRlLXVwZGF0ZS1kZWxldGUifSx7ImF1dGhvcml0eSI6InVzZXI6bW9uaXRvcmluZyJ9LHsiYXV0aG9yaXR5Ijoic291cmNlOnJlYWQifV0sImlhdCI6MTYzNzg1NjE4MCwiZXhwIjoxNjQ2NDYwMDAwfQ.-B0JwQhZTEak8lsQxOMLuYDftvSqKc3jj_tiZGOkMmSR_b1cUshb2-f6T_1DksrbZuLwv4b3dv12evu2kv64Vw";
const tokenAlex = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbGV4LnNvdGVsbyIsImF1dGhvcml0aWVzIjpbeyJhdXRob3JpdHkiOiJyb2xlOmNydWQifSx7ImF1dGhvcml0eSI6IlJPTEVfQURNSU5JU1RSQURPUiJ9LHsiYXV0aG9yaXR5Ijoic291cmNlOmNyZWF0ZS11cGRhdGUtZGVsZXRlIn0seyJhdXRob3JpdHkiOiJ1c2VyOm1vbml0b3JpbmcifSx7ImF1dGhvcml0eSI6InNvdXJjZTpyZWFkIn1dLCJpYXQiOjE2Mzc4NTYxODEsImV4cCI6MTY0NjQ2MDAwMH0.HTruA53nFYUwGlbCV0N_X83LntaT2A_e3kaPh5WOzZ5YFT7vJw8_NdfTKLTHChmnvoJacKzR1c_2w5bc9p0jbw";
const tokenMartin = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYXJ0aW4ucGVyZXoiLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5Ijoicm9sZTpjcnVkIn0seyJhdXRob3JpdHkiOiJST0xFX0FETUlOSVNUUkFET1IifSx7ImF1dGhvcml0eSI6InNvdXJjZTpjcmVhdGUtdXBkYXRlLWRlbGV0ZSJ9LHsiYXV0aG9yaXR5IjoidXNlcjptb25pdG9yaW5nIn0seyJhdXRob3JpdHkiOiJzb3VyY2U6cmVhZCJ9XSwiaWF0IjoxNjM3ODU2MTgxLCJleHAiOjE2NDY0NjAwMDB9.bUulFJMAKmy6ttnSjWVNSFdotqpc9FG41vKyCpZPaF_nINQb3sxwy4AsB8zLvKXExetq8MqksyoFiwCueyNs9Q";
const users = [
  { id: 2, username: "israel.garcia", password: "$2a$10$FIn2XFBAGxIg/BYH.9oF/un0zlw/iHaZWZIgMpiQS5np32BUd7UsG", name: "Israel Garcia", rol: { id: 1, rol: "ADMINISTRADOR" } },
  { id: 3, username: "alex.sotelo", password: "$2a$10$/izqZaSsdYKVe/7jA7VJJe.Agva2Tp5x6Ri/6XooDNTtKjA7oSpG.", name: "Alex Sotelo", rol: { id: 1, rol: "ADMINISTRADOR" } },
  { id: 2, username: "martin.perez", password: "$2a$10$MZwF.840bUPA8lb/LtKhUuTWWA1lR73jWjHbJqyWubgoIdmM4cffW", name: "Martin Perez", rol: { id: 1, rol: "ADMINISTRADOR" } }
]

export const environment = {
  production: false,
  api: `http://localhost:8080/api/socket?token=${tokenIsrael}`,
  user: users[0]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
