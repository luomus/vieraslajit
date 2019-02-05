import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StaticWrapperComponent } from './static-wrapper.component';

/**
 * Defines subroutes for the /static/ route
 *
 * /static/:id is routed to StaticComponent with the id param
 */

const routes: Routes = [
  { path: '', redirectTo: 'i-2'},
  { path: ':id', component: StaticWrapperComponent }
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
