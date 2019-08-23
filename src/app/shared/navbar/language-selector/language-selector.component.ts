import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import { take, map } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'vrs-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit {
  constructor(public translate: TranslateService, private router: Router, private route: ActivatedRoute, private location: Location) {}

  switchLanguage(language: string) {
    this.translate.use(language);
    window.localStorage.setItem("vrs-lang", language);

    const path = this.location.path().split('?')[0]
    this.router.navigate(
      ["reload/" + path],
      {queryParams: this.route.snapshot.queryParams, skipLocationChange: true});
  }

  ngOnInit() {
  }

}
