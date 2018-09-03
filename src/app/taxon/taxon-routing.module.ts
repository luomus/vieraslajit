import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaxonListComponent } from './taxon-list/taxon-list.component';
import { TaxonCardComponent } from './taxon-card/taxon-card.component';
import { TaxonComparisonComponent } from './taxon-comparison/taxon-comparison.component';

const routes: Routes = [
  { path: '', component: TaxonListComponent, runGuardsAndResolvers: 'always' },
  { path: 'informal/:group', component: TaxonListComponent, runGuardsAndResolvers: 'always' },
  { path: ':id', component: TaxonCardComponent },
  { path: ':id/comparison', component: TaxonComparisonComponent }
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
