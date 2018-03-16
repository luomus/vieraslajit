import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EulistComponent } from './eulist/eulist.component';
import { FilistComponent } from './filist/filist.component';
import { SharedModule } from '../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {routing } from './adminstrativelists.routing';



@NgModule({
  imports: [
    routing,
    CommonModule,
    SharedModule,
    NgxDatatableModule
  ],
  declarations: [EulistComponent, FilistComponent]
})
export class AdminstrativelistsModule { }
