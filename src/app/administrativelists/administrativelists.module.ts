import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CommonModule } from '@angular/common';
import { EulistComponent } from './eulist/eulist.component';
import { FilistComponent } from './filist/filist.component';
import { SharedModule } from '../shared/shared.module';
import { administrativelistsRoutingModule } from './administrativelists-routing.module';
import { ApiService } from '../shared/api/api.service';
import { ListService } from '../shared/service/list.service';
import { TabsModule } from 'ngx-bootstrap';
import { StaticModule } from '../static/static.module';
import { EulistobligationsComponent } from './eulistobligations/eulistobligations.component';
import { FilistobligationsComponent } from './filistobligations/filistobligations.component';
import { AdministrativelistsComponent } from './administrativelists.component';
import { AdministrativelistComponent } from './administrativelist/administrativelist.component';

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
    StaticModule

  ],
  declarations: [EulistComponent, FilistComponent, EulistobligationsComponent, FilistobligationsComponent, AdministrativelistsComponent, AdministrativelistComponent],
  providers:[ApiService,ListService]
})
export class administrativelistsModule { }
