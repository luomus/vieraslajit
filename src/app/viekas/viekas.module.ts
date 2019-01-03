import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViekasComponent } from './viekas.component';
import { ViekasRoutingModule } from './viekas-routing.module';
import { ViekasFrontComponent } from './viekas-front/viekas-front.component';

@NgModule({
  imports: [
    CommonModule,
    ViekasRoutingModule
  ],
  declarations: [ViekasComponent, ViekasFrontComponent]
})
export class ViekasModule { }
