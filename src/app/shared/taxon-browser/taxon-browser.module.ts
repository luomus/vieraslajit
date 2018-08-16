import { PaginationModule, TabsModule } from 'ngx-bootstrap';
import { NgModule } from '../../../../node_modules/@angular/core';
import { TaxonBrowserComponent } from './taxon-browser.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TaxonCardGridComponent } from './taxoncard-grid/taxoncard-grid.component';
import { RouterModule } from '../../../../node_modules/@angular/router';
import { CommonModule } from '../../../../node_modules/@angular/common';
import { TranslateModule } from '../../../../node_modules/@ngx-translate/core';
import { FormsModule } from '../../../../node_modules/@angular/forms';

@NgModule({
    imports: [PaginationModule, TabsModule, NgxDatatableModule, RouterModule, CommonModule, TranslateModule, FormsModule],
    declarations: [TaxonCardGridComponent, TaxonBrowserComponent],
    exports: [TaxonBrowserComponent]
})
export class TaxonBrowserModule {}