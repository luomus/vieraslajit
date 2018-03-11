import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaxonListComponent } from './taxon-list/taxon-list.component';
import { TaxonCardComponent } from './taxon-card/taxon-card.component';
import { TaxonComparisonComponent } from './taxon-comparison/taxon-comparison.component';

const routes: Routes = [
  { path: '', component: TaxonListComponent },
  { path: 'comparison', component: TaxonComparisonComponent},
  { path: ':id', component: TaxonCardComponent, data: { comparison: false} }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
