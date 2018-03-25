import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * Establishes top level routes in the app
 */

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomeModule' },
  { path: 'taxon', loadChildren: './taxon/taxon.module#TaxonModule' },
  { path: 'removal', loadChildren: './removal/removal.module#RemovalModule' },
  { path: 'news', loadChildren: './news/news.module#NewsModule' },
  { path: 'legal', loadChildren: './legal/legal.module#LegalModule' },
  { path: 'legal/law', loadChildren: './legal/legal.module#LegalModule' },
  { path: 'adminstrativelists', loadChildren:'./adminstrativelists/adminstrativelists.module#AdminstrativelistsModule'},
  { path: 'static', loadChildren: './static/static.module#StaticModule' },
  { path: 'user', loadChildren: './user/user.module#UserModule' },
  { path: 'form', loadChildren: './form/form.module#FormModule'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class VrsRouterModule { }
