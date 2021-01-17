import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaxonListComponent } from './taxon-list/taxon-list.component';
import { TaxonCardComponent } from './taxon-card/taxon-card.component';

const routes: Routes = [
  { path: '', component: TaxonListComponent },
  { path: ':id', component: TaxonCardComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class TaxonRoutingModule { }
