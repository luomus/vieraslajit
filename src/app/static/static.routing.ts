import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaticComponent } from './static.component';

const routes: Routes = [
  { path: ':id', component: StaticComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
