import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViekasComponent } from './viekas.component';
import { ViekasResolver } from './../viekas/viekas.resolver';

const routes: Routes = [
  { path: '', redirectTo: 'i-393', pathMatch: 'full'},
  { path: ':id', component: ViekasComponent, resolve: {data: ViekasResolver}}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    ViekasResolver
  ]
})

export class ViekasRoutingModule { }
