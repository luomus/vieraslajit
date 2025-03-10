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
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FormService } from './service/form.service';
import { FormApiClient } from './api/FormApiClient';
import { UserService } from './service/user.service';
import { InformationService } from './service/information.service';
import { SpinnerModule } from './../shared-modules/spinner/spinner.module'
import { ObservationService } from './service/observation.service';
import {EditcmsModule} from './../shared-modules/editcms/editcms.module';
import { DocumentService } from './service/document.service';
import { AreaService } from './service/area.service';
import { HelpComponent } from './help/help.component';
import { HelpPopupComponent } from './help/help-popup/help-popup.component';
import { CapitalizePipe } from './pipe/capitalize.pipe';
import { UserMenuComponent } from './navbar/user-menu/user-menu.component';
import { PersonMenuComponent } from './navbar/user-menu/person-menu.component';
import { HamburgerBarComponent } from './navbar/hamburger-bar/hamburger-bar.component';
import { NavbarContainer } from './navbar/navbar.container';
import { ParseWPPipe } from './pipe/parse-wp.pipe';
import { GoogleSearchApiService } from './api/google-search.api.service';
import { RouteTransformerDirective } from './directive/route-transformer.directive';
import { TaxonNamePipe } from './pipe/taxonName.pipe';
import { HtmlSanitizerPipe } from './pipe/html-sanitizer.pipe';
import { LoaderService } from './service/loader.service';
import { DateTranslatePipe } from './pipe/date-translate.pipe';
import { SpreadSheetService } from './service/spread-sheet.service';
import { TruncatePipe } from './pipe/truncate.pipe';
import { HttpClientModule } from '@angular/common/http';
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
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    HttpClientModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [NavbarComponent, NavbarContainer, PersonMenuComponent, FooterComponent, SearchComponent, LanguageSelectorComponent, OmnisearchComponent, LabelPipe, ParseWPPipe, HelpComponent, HelpPopupComponent, CapitalizePipe, UserMenuComponent, HamburgerBarComponent, RouteTransformerDirective, TaxonNamePipe, HtmlSanitizerPipe, DateTranslatePipe, TruncatePipe],
  providers: [],
  exports: [NavbarComponent, NavbarContainer, RouterModule, FooterComponent, SpinnerModule, EditcmsModule,
    SearchComponent, TranslateModule, LanguageSelectorComponent, OmnisearchComponent, LabelPipe, ParseWPPipe, HelpComponent, CapitalizePipe, RouteTransformerDirective, TaxonNamePipe, HtmlSanitizerPipe, DateTranslatePipe, TruncatePipe]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: SharedModule,
      providers: [
        ApiService,
        GoogleSearchApiService,
        TaxonService,
        NewsService,
        MetadataService,
        FormService,
        FormApiClient,
        UserService,
        InformationService,
        ObservationService,
        DocumentService,
        AreaService,
        LoaderService,
        SpreadSheetService
      ]
    };
  }
}
