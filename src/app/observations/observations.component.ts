import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { WarehouseQueryList } from '../shared/model/Warehouse';
import { PagedResult } from '../shared/model/PagedResult';
import { Subscription } from 'rxjs';
import { StateService } from '../state.service';
import { TranslateService } from '@ngx-translate/core';
import { Title, Meta } from '@angular/platform-browser';
import { environment } from 'environments/environment';

@Component({
  selector: 'vrs-observations',
  templateUrl: './observations.component.html',
  styleUrls: ['./observations.component.scss']
})
export class ObservationsComponent implements OnInit, OnDestroy {
  page: PagedResult<WarehouseQueryList>;
  id:string;
  queryParams: Subscription;

  constructor(
    private state: StateService,
    private title: Title,
    private meta: Meta,
    private translate: TranslateService
  ) {
    this.state.footerEnabled = false;
  }

  ngOnInit() {
    const title = this.translate.instant('title.observations') + this.translate.instant('title.post')
    this.title.setTitle(title)
    this.meta.updateTag({
        name: "og:title",
        content: title
    });
    this.meta.updateTag({
        name: "og:description",
        content: this.translate.instant('og.observations.description')
    });
    this.meta.updateTag({
        name: "description",
        content: this.translate.instant('og.observations.description')
    });
    this.meta.updateTag({
        name: "og:image",
        content: environment.baseUrl + "/assets/images/logos/vieraslajit_logo.png"
    });
  }

  ngOnDestroy() {
  }
}
