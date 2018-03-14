import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';

// user.module is routed to /user/login, so that wildcard route can be set up
const routes: Routes = [
  { path: '**', component: LoginComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);