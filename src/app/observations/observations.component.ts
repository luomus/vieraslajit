import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { WarehouseQueryList } from '../shared/model/Warehouse';
import { PagedResult } from '../shared/model/PagedResult';
import { Subscription } from 'rxjs';
import { StateService } from '../state.service';
import { TranslateService } from '@ngx-translate/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'vrs-observations',
  templateUrl: './observations.component.html',
  styleUrls: ['./observations.component.scss']
})
export class ObservationsComponent implements OnInit, OnDestroy {
  page: PagedResult<WarehouseQueryList>;
  id:string;
  queryParams: Subscription;

  constructor(private state: StateService, private title: Title, private translate: TranslateService) {
    this.state.footerEnabled = false;
  }

  ngOnInit() {
    this.title.setTitle(this.translate.instant('title.observations') + this.translate.instant('title.post'))
  }

  ngOnDestroy() {
  }
}
