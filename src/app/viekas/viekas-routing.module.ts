import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViekasComponent } from './viekas.component';
import { ViekasFrontComponent } from './viekas-front/viekas-front.component';

const routes: Routes = [
  { path: '', component: ViekasComponent,
    children: [
      { path: '', component: ViekasFrontComponent }
    ]
  }
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
