import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReloadComponent } from './reload.component';
import { ReloadRoutingModule } from './reload-routing.module';

@NgModule({
  imports: [
    ReloadRoutingModule,
    CommonModule
  ],
  declarations: [ReloadComponent]
})

export class ReloadModule { }
