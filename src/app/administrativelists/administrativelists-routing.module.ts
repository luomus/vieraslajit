import { NgModule }             from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { AdministrativelistsComponent, tabId } from './administrativelists.component';

const routes: Routes = [
  { path: '', redirectTo: 'eu', pathMatch: 'full' },
  { path: 'eu', component: AdministrativelistsComponent, data: {tab : 'eu'} },
  { path: 'fi', component: AdministrativelistsComponent, data: {tab : 'fi'} }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class administrativelistsRoutingModule { }
