import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ObservationlistComponent } from './observationlist/observationlist.component';
import {AllobservationsComponent} from'./allobservations/allobservations.component';



const routes: Routes = [
  { path: '', component: AllobservationsComponent },
  { path: 'mine', component: AllobservationsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObservationsRoutingModule { }
