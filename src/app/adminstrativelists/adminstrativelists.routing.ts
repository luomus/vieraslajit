import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EulistComponent } from './eulist/eulist.component';
import { FilistComponent } from './filist/filist.component';

const routes: Routes = [
  { path: '', component: FilistComponent }
  
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
