import { Component, OnInit } from '@angular/core';
import { StateService } from '../../state.service';
import { Title, Meta } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'vrs-taxon-list',
  templateUrl: './taxon-list.component.html',
  styleUrls: ['./taxon-list.component.scss']
})
export class TaxonListComponent implements OnInit {
  constructor(
    private state: StateService,
    private title: Title,
    private meta: Meta,
    private translate: TranslateService
  ) {
    state.footerEnabled = false;
  }

  ngOnInit() {
    const title = this.translate.instant('title.taxon') + this.translate.instant('title.post')
    this.title.setTitle(title)
    this.meta.updateTag({
        property: "og:title",
        content: title
    });
    this.meta.updateTag({
        property: "og:description",
        content: this.translate.instant('og.taxonList.description')
    });
    this.meta.updateTag({
        property: "description",
        content: this.translate.instant('og.taxonList.description')
    });
    this.meta.updateTag({
        property: "og:image",
        content: environment.baseUrl + "/assets/images/logos/vieraslajit_logo.png"
    });
  }
}
