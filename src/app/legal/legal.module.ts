import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegalComponent } from './legal.component';
import { LegalRoutingModule } from './legal-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TabsModule } from 'ngx-bootstrap';


@NgModule({
  imports: [
    CommonModule,
    LegalRoutingModule,
    SharedModule,
    TabsModule
  ],
  declarations: [LegalComponent]
})
export class LegalModule { }
