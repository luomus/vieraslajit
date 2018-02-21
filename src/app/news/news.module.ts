import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news.component';
import { routing } from './news.routing';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [NewsComponent]
})
export class NewsModule { }
