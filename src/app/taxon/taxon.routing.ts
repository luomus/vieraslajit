import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaxonListComponent } from './taxon-list/taxon-list.component';

const routes: Routes = [
  { path: '', component: TaxonListComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
