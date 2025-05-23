import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './form.routing';
import { FormComponent } from './form/form.component';
import { SharedModule } from '../shared/shared.module';
import { FormsComponent } from './forms.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsFacade } from './forms.facade';
import { FormFacade } from './form/form.facade';
import { PreReportFormModule } from 'app/shared-modules/pre-report-form/pre-report-form.module';

/**
 * Declares routes and components for rendering laji-forms
 */
@NgModule({
  imports: [
    CommonModule,
    routing,
    SharedModule,
    NgxDatatableModule,
    PreReportFormModule
  ],
  declarations: [FormComponent, FormsComponent]
})
export class FormModule { }
