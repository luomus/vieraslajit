import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * Establishes top level routes in the app
 */

const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'lajit', loadChildren: () => import('./taxon/taxon.module').then(m => m.TaxonModule) },
  { path: 'kansalaistoiminta', loadChildren: () => import('./viekas/viekas.module').then(m => m.ViekasModule) },
  { path: 'ajankohtaista', loadChildren: () => import('./news/news.module').then(m => m.NewsModule) },
  { path: 'info', loadChildren: () => import('./static/static.module').then(m => m.StaticModule) },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
  { path: 'ilmoita', loadChildren: () => import('@form/form.module').then(m => m.FormModule) },
  { path: 'havainnot', loadChildren: () => import('./observations/observations.module').then(m => m.ObservationsModule) },
  { path: 'reload', loadChildren: () => import('./reload/reload.module').then(m => m.ReloadModule) }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload', scrollPositionRestoration: 'enabled' })
  ],
  exports: [
    RouterModule
  ]
})
export class VrsRouterModule { }
