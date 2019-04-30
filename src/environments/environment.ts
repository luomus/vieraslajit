// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  vierasCollection: 'HR.2049',
  baseUrl: 'https://vieraslajit-dev.laji.fi',
  lajiApi: {
    url: 'https://vieraslajit-dev.laji.fi/api'
  },
  lajiAuth: {
    authUrl: 'https://fmnh-ws-test.it.helsinki.fi/laji-auth/',
    systemID: 'KE.741'
  },
  googleSearch: {
    url: 'https://www.googleapis.com/customsearch/v1',
    key: 'AIzaSyCReh-YJ3pDZv5ngzGQaZoPANqi8nYDYQs',
    engineId: '006132177942388329814:wyntd_p9woi'
  }
};
