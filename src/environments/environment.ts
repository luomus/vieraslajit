// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  lajiApi: {
    url: 'https://apitest.laji.fi/v0/',
    accessToken: 'kFEdTHdoHEY2c98BokkdjhOLx8PUHdjbDTFeIkDLkWLwGwYcz8RwA3UxI1ybegzx'
  },
  lajiAuth: {
    loginUrl: 'https://fmnh-ws-test.it.helsinki.fi/laji-auth/login',
    systemID: 'KE.741'
  }
};
