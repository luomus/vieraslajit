import { NgModule, ModuleWithProviders } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api/api.service';
import { SearchComponent } from './googlesearch/search/search.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { TaxonService } from './service/taxon.service';
import { OmnisearchComponent } from './omnisearch/omnisearch.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [NavbarComponent, FooterComponent, SearchComponent, OmnisearchComponent],
  providers: [],
  exports: [NavbarComponent, RouterModule, FooterComponent, SearchComponent, OmnisearchComponent]
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
