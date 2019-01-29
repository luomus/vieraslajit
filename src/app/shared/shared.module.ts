import { NgModule, ModuleWithProviders } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api/api.service';
import { SearchComponent } from './googlesearch/search/search.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { TaxonService } from './service/taxon.service';
import { NewsService } from './service/news.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { LanguageSelectorComponent } from './navbar/language-selector/language-selector.component';
import { LabelPipe } from './pipe/label.pipe';
import { MetadataService } from './service/metadata.service';
import { OmnisearchComponent } from './omnisearch/omnisearch.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, ModalModule, CollapseModule } from 'ngx-bootstrap';
import { FormService } from './service/form.service';
import { FormApiClient } from './api/FormApiClient';
import { UserService } from './service/user.service';
import { HttpModule } from '@angular/http';
import { InformationService } from './service/information.service';
import { SpinnerModule } from './../shared-modules/spinner/spinner.module'
import { ObservationService } from './service/observation.service';
import {EditcmsModule} from './../shared-modules/editcms/editcms.module';
import {ObservationMapModule} from '../shared-modules/observation-map/observation-map.module';
import { DocumentService } from './service/document.service';
import { AlertService } from './service/alert.service';
import { AreaService } from './service/area.service';
import { HelpComponent } from './help/help.component';
import { HelpPopupComponent } from './help/help-popup/help-popup.component';
import { CapitalizePipe } from './pipe/capitalize.pipe';
import { UserMenuComponent } from './navbar/user-menu/user-menu.component';
import { PersonMenuComponent } from './navbar/user-menu/person-menu.component';
import { HamburgerBarComponent } from './navbar/hamburger-bar/hamburger-bar.component';
import { NavbarContainer } from './navbar/navbar.container';
import { ParseWPPipe } from './pipe/parse-wp.pipe';
/**
 * Provides common utilities for other modules
 */

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule,
    SpinnerModule,
    EditcmsModule,
    ObservationMapModule,
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    HttpModule
  ],
  entryComponents: [SearchComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [NavbarComponent, NavbarContainer, PersonMenuComponent, FooterComponent, SearchComponent, LanguageSelectorComponent, OmnisearchComponent, LabelPipe, ParseWPPipe, HelpComponent, HelpPopupComponent, CapitalizePipe, UserMenuComponent, HamburgerBarComponent ],
  providers: [],
  exports: [NavbarComponent, NavbarContainer, RouterModule, FooterComponent, SpinnerModule, EditcmsModule, ObservationMapModule,
    SearchComponent, TranslateModule, LanguageSelectorComponent, OmnisearchComponent, LabelPipe, ParseWPPipe, HelpComponent, CapitalizePipe]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ApiService,
        TaxonService,
        NewsService,
        MetadataService,
        FormService,
        FormApiClient,
        UserService,
        InformationService,
        ObservationService,
        DocumentService,
        AlertService,
        AreaService
      ]
    };
  }
}
