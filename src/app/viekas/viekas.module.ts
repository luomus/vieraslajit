import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViekasComponent } from './viekas.component';
import { ViekasRoutingModule } from './viekas-routing.module';
import { ViekasFrontComponent } from './viekas-front/viekas-front.component';
import { SharedModule } from '../shared/shared.module';
import { ViekasStaticComponent } from './viekas-static/viekas-static.component';

@NgModule({
  imports: [
    CommonModule,
    ViekasRoutingModule,
    SharedModule
  ],
  declarations: [
    ViekasComponent,
    ViekasFrontComponent,
    ViekasStaticComponent
  ]
})
export class ViekasModule { }
