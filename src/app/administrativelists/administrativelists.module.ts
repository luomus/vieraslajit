import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { administrativelistsRoutingModule } from './administrativelists-routing.module';
import { ApiService } from '../shared/api/api.service';
import { ListService } from '../shared/service/list.service';
import { TabsModule } from 'ngx-bootstrap';
import { StaticModule } from '../static/static.module';
import { AdministrativelistsComponent } from './administrativelists.component';
import { TaxonBrowserModule } from '../shared-modules/taxon-browser/taxon-browser.module';

/**
 * Declares routes and components for European and Finnish lists of invasive alien species
 */
@NgModule({
  imports: [
    administrativelistsRoutingModule,
    CommonModule,
    SharedModule,
    NgxDatatableModule,
    TabsModule,
    StaticModule,
    TaxonBrowserModule
  ],
  declarations: [AdministrativelistsComponent],
  providers:[ApiService,ListService]
})
export class administrativelistsModule { }
