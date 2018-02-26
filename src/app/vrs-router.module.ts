import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomeModule' },
  { path: 'taxon', loadChildren: './taxon/taxon.module#TaxonModule' },
  { path: 'removal', loadChildren: './removal/removal.module#RemovalModule' },
  { path: 'news', loadChildren: './news/news.module#NewsModule' },
  { path: 'legal', loadChildren: './legal/legal.module#LegalModule' },
  { path: 'legal/law', loadChildren: './legal/legal.module#LegalModule' }
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
