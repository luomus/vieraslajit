import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaticContainerComponent } from 'app/static/static.container';

const routes: Routes = [
  { path: '', redirectTo: 'i-545', pathMatch: 'full'},
  { path: ':id', component: StaticContainerComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class ViekasRoutingModule { }
