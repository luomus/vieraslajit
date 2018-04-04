import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BsDropdownModule, AccordionModule, TabsModule, PaginationModule } from 'ngx-bootstrap';

import { VrsRouterModule } from './vrs-router.module';

import { AppComponent } from './app.component';
import { SpinnerModule } from './shared-modules/spinner/spinner.module';
import { SharedModule } from './shared/shared.module';
import { TranslateService } from '@ngx-translate/core';


export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
    VrsRouterModule,
    SharedModule.forRoot(),
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    SpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
