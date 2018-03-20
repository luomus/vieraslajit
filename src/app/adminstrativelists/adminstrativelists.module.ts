import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CommonModule } from '@angular/common';
import { EulistComponent } from './eulist/eulist.component';
import { FilistComponent } from './filist/filist.component';
import { SharedModule } from '../shared/shared.module';
import {routing } from './adminstrativelists.routing';
import { ApiService } from '../shared/api/api.service';
import { ListService } from '../shared/service/list.service';




@NgModule({
  imports: [
    routing,
    CommonModule,
    SharedModule,
    NgxDatatableModule
  ],
  declarations: [EulistComponent, FilistComponent],
  providers:[ApiService,ListService]
})
export class AdminstrativelistsModule { }
