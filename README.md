# Vieraslajit
The frontend for [vieraslajit.fi](https://vieraslajit.fi.laji.fi). Beta environment: [vieraslajit-dev](https://vieraslajit-dev.laji.fi).

## Setup
Requires node 14.20.0 (node-sass won't build on newer versions).

```
npm ci
```

Serve development mode:
```
npm start
```

Build local/beta/prod:
```
npm run build:local
npm run build:beta
npm run build:prod
```

Start SSR server:
```
npm run serve:ssr
```

