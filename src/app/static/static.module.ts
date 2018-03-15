import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaticComponent } from './static.component';
import {routing} from './static.routing';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [StaticComponent]
})
export class StaticModule { }
