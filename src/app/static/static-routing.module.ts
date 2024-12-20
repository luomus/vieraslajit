import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaticContainerComponent } from './static.container';

/**
 * Defines subroutes for the /static/ route
 *
 * /static/:id is routed to StaticComponent with the id param
 */

const routes: Routes = [
  { path: '', redirectTo: 'i-2', pathMatch: 'full'},
  { path: ':id', component: StaticContainerComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class StaticRoutingModule { }
