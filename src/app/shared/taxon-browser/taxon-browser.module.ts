import { TabsModule } from 'ngx-bootstrap';
import { NgModule } from '../../../../node_modules/@angular/core';
import { TaxonBrowserComponent } from './taxon-browser.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TaxonCardGridComponent } from './taxoncard-grid/taxoncard-grid.component';
import { RouterModule } from '../../../../node_modules/@angular/router';
import { CommonModule } from '../../../../node_modules/@angular/common';
import { TranslateModule } from '../../../../node_modules/@ngx-translate/core';
import { FormsModule } from '../../../../node_modules/@angular/forms';
import { TaxonBrowserListComponent } from './taxon-browser-list/taxon-browser-list.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
    imports: [NgxPaginationModule, TabsModule, NgxDatatableModule, RouterModule, CommonModule, TranslateModule, FormsModule],
    declarations: [TaxonCardGridComponent, TaxonBrowserComponent, TaxonBrowserListComponent],
    exports: [TaxonBrowserComponent]
})
export class TaxonBrowserModule {}