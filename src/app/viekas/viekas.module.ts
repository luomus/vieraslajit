import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViekasRoutingModule } from './viekas-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StaticModule } from 'app/static/static.module';

@NgModule({
  imports: [
    CommonModule,
    ViekasRoutingModule,
    SharedModule,
    StaticModule
  ],
  declarations: [
  ]
})
export class ViekasModule { }
