import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'vrs-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {

  translate: TranslateService;

  constructor(translate: TranslateService) {
    this.translate = translate;
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    window.localStorage.setItem("vrs-lang", language);
  }

  ngOnInit() {
  }

}
