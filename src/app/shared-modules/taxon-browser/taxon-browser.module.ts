import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgModule } from '@angular/core';
import { TaxonBrowserComponent } from './taxon-browser.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaxonBrowserListComponent } from './taxon-browser-list/taxon-browser-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SpinnerModule } from '../../shared-modules/spinner/spinner.module';
import { SharedModule } from '../../shared/shared.module';
import { InformalGroupComponent } from './informal-group/informal-group.component';
import { InformalGroupGridComponent } from './informal-group/informal-group-grid.component';
import { TaxonGridComponent } from './taxon-grid/taxon-grid.component';
import { GroupDropdownComponent } from './informal-group/group-dropdown.component';
import { OptionsAccordionComponent } from './options-accordion.component';
import { FilterInfoComponent } from './filter-info/filter-info.component';
import { SelectSortOrderComponent } from './select-sort-order/select-sort-order.component';

@NgModule({
    imports: [NgxPaginationModule, TabsModule, NgxDatatableModule, RouterModule,
        CommonModule, TranslateModule, FormsModule, SpinnerModule, SharedModule, InfiniteScrollModule, ReactiveFormsModule],
    declarations: [GroupDropdownComponent, TaxonGridComponent, TaxonBrowserComponent, TaxonBrowserListComponent, InformalGroupComponent, InformalGroupGridComponent, OptionsAccordionComponent, FilterInfoComponent, SelectSortOrderComponent ],
    exports: [TaxonBrowserComponent]
})
export class TaxonBrowserModule {}
