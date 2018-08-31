import { Component, OnInit, OnDestroy } from '@angular/core';
import { OmnisearchComponent } from '../shared/omnisearch/omnisearch.component';
import { TranslateService } from '@ngx-translate/core';
import { findContentID, StaticContent } from '../../assets/i18n/cms-content';
import { Subscription } from 'rxjs';

@Component({
  selector: 'vrs-eradication',
  templateUrl: './eradication.component.html',
  styleUrls: ['./eradication.component.scss']
})
export class EradicationComponent implements OnInit, OnDestroy {

  private onLangChange: Subscription;
  staticInfoID: string;
  staticGuidesID: string;

  constructor(private translate: TranslateService) { }

  ngOnInit() {
    this.setStaticID(this.translate.currentLang);
    this.onLangChange = this.translate.onLangChange.subscribe((event) => {
      this.setStaticID(event.lang);
    });
  }

  private setStaticID(lang: string) {
    this.staticInfoID = findContentID(StaticContent.EradicationInfo, lang);
    this.staticGuidesID = findContentID(StaticContent.EradicationGuides, lang);
  }

  ngOnDestroy() {
    if (this.onLangChange) {
      this.onLangChange.unsubscribe();
    }
  }

}
