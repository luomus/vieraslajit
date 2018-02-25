import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LegalComponent} from './legal.component'

const routes: Routes = [
    { path: '', component: LegalComponent }
  ];
  
  export const routing: ModuleWithProviders = RouterModule.forChild(routes);