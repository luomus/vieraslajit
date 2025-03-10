import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { VrsRouterModule } from './vrs-router.module';
import { AppComponent } from './app.component';
import { SpinnerModule } from './shared-modules/spinner/spinner.module';
import { EditcmsModule } from './shared-modules/editcms/editcms.module';
import { SharedModule } from './shared/shared.module';
import { UserService } from './shared/service/user.service';
import { registerLocaleData } from '@angular/common';
import localeFi from '@angular/common/locales/fi';
import { StateService } from './state.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LoaderInterceptor } from './shared/interceptor/loader-interceptor';
import { TranslateFileLoader } from './translate-file-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

registerLocaleData(localeFi);

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}

/**
 * Top level module that loads all globally used modules
 */

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: TranslateFileLoader
      }
    }),
    VrsRouterModule,
    SharedModule.forRoot(),
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    SpinnerModule,
    EditcmsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    TransferHttpCacheModule
  ],
  providers: [
    StateService,
    UserService,
    Title,
    { provide: LOCALE_ID, useValue: 'fi' },
    {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
