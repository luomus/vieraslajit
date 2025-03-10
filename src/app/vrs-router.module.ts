import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlMatchResult, UrlSegment, UrlSegmentGroup, Route } from '@angular/router';

export function hbeMatcher(url: UrlSegment[]) {
  return url.join('/').match(/lajit\/HBE.*/) ? { consumed: url } : null
}
export function mainMatcher(url: UrlSegment[]) {
  return url.join('/').match(/lajit\/(main|kaikki).*/) ? { consumed: url } : null
}

// Redirects from old vieraslajit.fi urls
export const redirects: Routes = [
  {
    path: 'fi',
    loadChildren: () => import('./old-vieraslajit-redirect/redirect.module').then(m => m.RedirectModule)
  },
  {
    matcher: hbeMatcher,
    redirectTo: 'lajit'
  },
  {
    matcher: mainMatcher,
    redirectTo: 'lajit'
  },
  {
    path: 'lajit/:id/show',
    redirectTo: '/lajit/:id'
  },
  {
    path: 'lajit/:id/list',
    redirectTo: '/lajit/:id'
  },
  {
    path: 'content/usein-kysyttyj%C3%A4-kysymyksi%C3%A4',
    redirectTo: '/info/i-92'
  },
  {
    path: 'content/it%C3%A4meren-vieraslajiopas',
    redirectTo: '/info/i-346'
  },
  {
    path: 'node/26',
    redirectTo: '/info/i-783'
  },
  {
    path: 'content/v%C3%A4lkommen-till-portalen-f%C3%B6r-fr%C3%A4mmande-arter-i-finland',
    redirectTo: '/info/i-163'
  },
  {
    path: 'content/haitallisen-kurtturuusun-tunnistaminen-ja-torjunta-pihalla-ja-puutarhassa',
    redirectTo: '/lajit/MX.38815'
  },
  {
    path: 'content/ilmoita-havaintosi',
    redirectTo: 'ilmoita'
  },
  {
    path: 'node/21', // määritelmiä ja käsitteitä
    redirectTo: '/info/i-284' // torjuntakeinot ja menetelmät
  },
  {
    path: 'node/27',
    redirectTo: '/info/i-292'
  },
  {
    path: 'content/vieraslajiasetus',
    redirectTo: '/info/i-783'
  },
];

const routes: Routes = [
  ...redirects,
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'lajit', loadChildren: () => import('./taxon/taxon.module').then(m => m.TaxonModule) },
  { path: 'kansalaistoiminta', loadChildren: () => import('./viekas/viekas.module').then(m => m.ViekasModule) },
  { path: 'ajankohtaista', loadChildren: () => import('./news/news.module').then(m => m.NewsModule) },
  { path: 'info', loadChildren: () => import('./static/static.module').then(m => m.StaticModule) },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: 'ilmoita', loadChildren: () => import('@form/form.module').then(m => m.FormModule) },
  { path: 'havainnot', loadChildren: () => import('./observations/observations.module').then(m => m.ObservationsModule) },
  { path: 'palaute', loadChildren: () => import('./feedback/feedback.module').then(m => m.FeedbackModule) },
  { path: 'reload', loadChildren: () => import('./reload/reload.module').then(m => m.ReloadModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
      scrollPositionRestoration: 'enabled',
      initialNavigation: 'enabledBlocking',
      relativeLinkResolution: 'legacy'
    })
  ],
  exports: [
    RouterModule
  ]
})
export class VrsRouterModule { }
