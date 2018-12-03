import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViekasComponent } from './viekas.component';
import { ViekasRoutingModule } from './viekas-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ViekasRoutingModule
  ],
  declarations: [ViekasComponent]
})
export class ViekasModule { }
