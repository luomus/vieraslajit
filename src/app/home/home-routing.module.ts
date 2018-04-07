import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';

/**
 * Defines subroutes for the /home/ path.
 * 
 * /home path is assigned to HomeComponent
 */

const routes: Routes = [
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class HomeRoutingModule { }
