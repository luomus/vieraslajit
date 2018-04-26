import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EradicationComponent } from './eradication.component';

const routes: Routes = [
  { path: '', component: EradicationComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class EradicationRoutingModule { }
