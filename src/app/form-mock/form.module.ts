import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './form.routing';
import { FormComponent } from './form/form.component';
import { SharedModule } from '../shared/shared.module';

/**
 * Declares routes and components for rendering laji-forms
 */
@NgModule({
  imports: [
    CommonModule,
    routing,
    SharedModule
  ],
  declarations: [FormComponent]
})
export class FormModule { }
