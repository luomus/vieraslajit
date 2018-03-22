import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './form.routing';
import { FormComponent } from './form/form.component';
import { SharedModule } from '../shared/shared.module';
import { AlertModule, ModalModule } from 'ngx-bootstrap';
import LajiForm from 'laji-form/lib/laji-form';

@NgModule({
  imports: [
    CommonModule,
    routing,
    SharedModule,
    AlertModule,
    ModalModule
  ],
  declarations: [FormComponent]
})
export class FormModule { }
