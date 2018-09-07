import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news.component';
import { NewsRoutingModule } from './news-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TabsModule } from 'ngx-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination'
import { NewsHeaderComponent } from './news-header/news-header.component';

/**
 * Declares component and routes for the main news view of the app
 */
@NgModule({
  imports: [
    CommonModule,
    NewsRoutingModule,
    SharedModule,
    TabsModule.forRoot(),
    NgxPaginationModule
  ],
  declarations: [NewsComponent, NewsHeaderComponent]
})
export class NewsModule { }
