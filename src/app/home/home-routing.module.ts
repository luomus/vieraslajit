import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Homev5Component } from './homev5/homev5.component';

/**
 * Defines subroutes for the /home/ path.
 * 
 * /home path is assigned to HomeComponent
 */

const routes: Routes = [
  { path: '', component: Homev5Component },
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
