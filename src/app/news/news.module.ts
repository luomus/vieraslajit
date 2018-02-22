import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news.component';
import { routing } from './news.routing';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    routing,
    SharedModule
  ],
  declarations: [NewsComponent]
})
export class NewsModule { }
