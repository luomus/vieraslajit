import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form/form.component';

/**
 * Declares routes and components for rendering laji-forms
 */
@NgModule({
  imports: [
    CommonModule,
    FormRoutingModule
  ],
  declarations: [FormComponent]
})
export class FormModule { }
