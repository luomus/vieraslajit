import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaticComponent } from './static.component';

/**
 * Defines subroutes for the /static/ route
 *
 * /static/:id is routed to StaticComponent with the id param
 */

const routes: Routes = [
  { path: ':id', component: StaticComponent }
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
