import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'vrs-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {
  constructor(public translate: TranslateService, private router: Router) {}

  switchLanguage(language: string) {
    this.translate.use(language);
    window.localStorage.setItem("vrs-lang", language);
    this.router.navigate(["reload/" + this.router.url], {skipLocationChange: true});
  }

  ngOnInit() {
  }

}
