import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news.component';
import { NewsRoutingModule } from './news-routing.module';
import { SharedModule } from '../shared/shared.module';

/**
 * Declares component and routes for the main news view of the app
 */
@NgModule({
  imports: [
    CommonModule,
    NewsRoutingModule,
    SharedModule,
  ],
  declarations: [NewsComponent]
})
export class NewsModule { }
