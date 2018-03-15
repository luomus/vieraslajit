import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegalComponent } from './legal.component';
import { routing } from './legal.routing';
import { SharedModule } from '../shared/shared.module';
import { TabsModule } from 'ngx-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    routing,
    SharedModule,
    TabsModule
  ],
  declarations: [LegalComponent]
})
export class LegalModule { }
