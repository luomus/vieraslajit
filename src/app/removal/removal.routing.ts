import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RemovalComponent } from './removal.component';


const routes: Routes = [
  { path: '', component: RemovalComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);