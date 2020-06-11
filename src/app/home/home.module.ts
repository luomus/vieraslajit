import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { TopicalSpeciesComponent } from './topical-species/topical-species.component';
import { TaxonSearchModule } from 'app/shared-modules/taxon-search/taxon-search.module';
import { Homev5Component } from './homev5/homev5.component';

/**
 * Declares routes and component for rendering the home/front -page
 */

@NgModule({
  imports: [
    HomeRoutingModule,
    CommonModule,
    SharedModule
  ],
  declarations: [HomeComponent, TopicalSpeciesComponent, Homev5Component]
})

export class HomeModule { }
