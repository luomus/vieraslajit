import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * Establishes top level routes in the app
 */

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomeModule' },
  { path: 'taxon', loadChildren: './taxon/taxon.module#TaxonModule' },
  { path: 'eradication', loadChildren: './eradication/eradication.module#EradicationModule' },
  { path: 'viekas', loadChildren: './viekas/viekas.module#ViekasModule' },
  { path: 'news', loadChildren: './news/news.module#NewsModule' },
  { path: 'legal', loadChildren: './legal/legal.module#LegalModule' },
  { path: 'legal/law', loadChildren: './legal/legal.module#LegalModule' },
  { path: 'administrativelists', loadChildren: './administrativelists/administrativelists.module#administrativelistsModule' },
  { path: 'static', loadChildren: './static/static.module#StaticModule' },
  { path: 'user', loadChildren: './user/user.module#UserModule' },
  { path: 'form', loadChildren: './form/form.module#FormModule' },
  { path: 'observations', loadChildren: './observations/observations.module#ObservationsModule' },
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
