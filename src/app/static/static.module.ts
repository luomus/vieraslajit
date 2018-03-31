import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaticComponent } from './static.component';
import {routing} from './static.routing';
import { TabsModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    routing,
    TabsModule
  ],
  declarations: [StaticComponent]
})
export class StaticModule { }
