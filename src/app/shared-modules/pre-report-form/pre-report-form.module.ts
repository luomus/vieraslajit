import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreReportFormComponent } from './pre-report-form.component';
import { TaxonSearchModule } from '../taxon-search/taxon-search.module';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    TaxonSearchModule
  ],
  declarations: [PreReportFormComponent],
  exports: [PreReportFormComponent]
})
export class PreReportFormModule { }
