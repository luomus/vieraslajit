import { NgModule }             from '@angular/core';
import { Routes, RouterModule, ActivatedRoute } from '@angular/router';
import { EulistComponent } from './eulist/eulist.component';
import { FilistComponent } from './filist/filist.component';
import { EulistobligationsComponent } from './eulistobligations/eulistobligations.component';
import { FilistobligationsComponent } from './filistobligations/filistobligations.component';
import { AdministrativelistsComponent, tabId } from './administrativelists.component';

const routes: Routes = [
  { path: '', redirectTo: 'eu', pathMatch: 'full' },
  { path: 'eu', component: AdministrativelistsComponent, data: {tab : 'eu'} },
  { path: 'fi', component: AdministrativelistsComponent, data: {tab : 'fi'} }
  /* { path: 'eu', component: EulistComponent },
  { path: 'national', component: FilistComponent},
  { path: 'national/obligations', component: FilistobligationsComponent},
  { path: 'eu/obligations', component: EulistobligationsComponent},
 */
  
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
