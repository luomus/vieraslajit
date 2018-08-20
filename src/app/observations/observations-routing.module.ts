import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObservationsComponent } from './observations.component';



const routes: Routes = [
  { path: '', component: ObservationsComponent },
  { path: ':mode', component: ObservationsComponent },
  { path: 'taxon/:id', component: ObservationsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObservationsRoutingModule { }
