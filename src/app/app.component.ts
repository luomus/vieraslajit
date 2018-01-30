import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from './shared/api/api.service';

@Component({
  selector: 'vrs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vrs';
  translate: TranslateService;
  private apiService: ApiService;

  constructor(translate: TranslateService, apiService: ApiService) {
    this.translate = translate;
    this.apiService = apiService;
    // oletuskieli jos käännöstä ei löydy halutulla kielellä
    translate.setDefaultLang('fi');

    // oletuskieli jos haluttua kieltä ei ole saatavilla
    translate.use('fi');

    alert(apiService.testi().testValue);
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
