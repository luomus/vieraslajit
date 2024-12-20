import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { TaxonListComponent } from './taxon-list/taxon-list.component';
import { TaxonCardComponent } from './taxon-card/taxon-card.component';

import { TaxonRoutingModule } from './taxon-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TaxonBrowserModule } from '../shared-modules/taxon-browser/taxon-browser.module';
import { ObservationMapModule } from '@observation-map/observation-map.module';
import { TaxonCardFacade } from './taxon-card/taxon-card.facade';

/**
 * Declares routes and components for browsing and viewing invasive species
 */
@NgModule({
  imports: [
    CommonModule,
    TaxonRoutingModule,
    FormsModule,
    SharedModule,
    NgxDatatableModule,
    AccordionModule,
    CollapseModule,
    PaginationModule,
    TabsModule,
    CarouselModule,
    BsDropdownModule,
    TaxonBrowserModule,
    ObservationMapModule
  ],
  providers: [TaxonCardFacade],
  declarations: [TaxonListComponent, TaxonCardComponent]
})
export class TaxonModule { }
