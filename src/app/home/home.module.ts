import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';

import { routing } from './home.routing';

@NgModule({
  imports: [
    routing,
    CommonModule,
    SharedModule

  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
