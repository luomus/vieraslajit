import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaxonComponent } from './taxon.component';

const routes: Routes = [
  { path: '', component: TaxonComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
