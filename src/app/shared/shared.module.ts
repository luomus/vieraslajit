import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api/api.service';
import {SearchComponent} from './googlesearch/search/search.component';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { TaxonService } from './service/taxon.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [NavbarComponent, FooterComponent, SearchComponent],
  providers: [],
  exports: [ NavbarComponent, RouterModule, FooterComponent ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
      return {
        ngModule: SharedModule,
        providers: [
          ApiService,
          TaxonService
        ]
      };
  }
}
