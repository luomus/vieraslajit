import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RemovalComponent } from './removal.component';

const routes: Routes = [
  { path: '', component: RemovalComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class RemovalRoutingModule { }
