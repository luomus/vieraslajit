import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { SearchComponent } from '../shared/googlesearch/search/search.component';


@NgModule({
  imports: [
    HomeRoutingModule,
    CommonModule,
    SharedModule,
  
    
  ],
 
  declarations: [HomeComponent]
})

export class HomeModule { }
