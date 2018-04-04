import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaticComponent } from './static.component';
import {routing} from './static.routing';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    routing,
    SharedModule
  ],
  declarations: [StaticComponent]
})
export class StaticModule { }
