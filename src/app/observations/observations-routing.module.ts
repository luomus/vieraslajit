import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ObservationlistComponent } from './observationlist/observationlist.component';


const routes: Routes = [
  { path: '', component: ObservationlistComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObservationsRoutingModule { }
