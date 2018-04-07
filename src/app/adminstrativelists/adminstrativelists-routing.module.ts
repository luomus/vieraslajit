import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EulistComponent } from './eulist/eulist.component';
import { FilistComponent } from './filist/filist.component';

const routes: Routes = [
  { path: '', component: EulistComponent },
  { path: 'national', component: FilistComponent}

  
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminstrativelistsRoutingModule { }
