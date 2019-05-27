import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * Establishes top level routes in the app
 */

const routes: Routes = [
  { path: '', loadChildren: './home/home.module#HomeModule' },
  { path: 'lajit', loadChildren: './taxon/taxon.module#TaxonModule' },
  { path: 'kansalaistoiminta', loadChildren: './viekas/viekas.module#ViekasModule' },
  { path: 'ajankohtaista', loadChildren: './news/news.module#NewsModule' },
  { path: 'info', loadChildren: './static/static.module#StaticModule' },
  { path: 'user', loadChildren: './user/user.module#UserModule' },
  { path: 'ilmoita', loadChildren: '@form/form.module#FormModule' },
  { path: 'havainnot', loadChildren: './observations/observations.module#ObservationsModule' },
  { path: 'reload', loadChildren: './reload/reload.module#ReloadModule' }
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
