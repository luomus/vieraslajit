import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RemovalComponent } from './removal.component';

import { routing } from './removal.routing';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [RemovalComponent]
})
export class RemovalModule { }