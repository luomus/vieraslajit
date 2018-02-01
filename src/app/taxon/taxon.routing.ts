import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaxonListComponent } from './taxon-list/taxon-list.component';
import { TaxonCardComponent } from './taxon-card/taxon-card.component';

const routes: Routes = [
  { path: '', component: TaxonListComponent },
  { path: ':id', component: TaxonCardComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
