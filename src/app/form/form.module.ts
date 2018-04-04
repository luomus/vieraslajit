import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './form.routing';
import { FormComponent } from './form/form.component';
import { SharedModule } from '../shared/shared.module';
import LajiForm from 'laji-form/lib/laji-form';
import { FormService } from '../shared/service/form.service';

@NgModule({
  imports: [
    CommonModule,
    routing,
    SharedModule
  ],
  declarations: [FormComponent]
})
export class FormModule { }
