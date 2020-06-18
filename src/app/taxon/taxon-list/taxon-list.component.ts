import { Component, OnInit } from '@angular/core';
import { StateService } from '../../state.service';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'vrs-taxon-list',
  templateUrl: './taxon-list.component.html',
  styleUrls: ['./taxon-list.component.scss']
})
export class TaxonListComponent implements OnInit {
  constructor(private state: StateService, private title: Title, private translate: TranslateService) {
    state.footerEnabled = false;
  }

  ngOnInit() {
    this.title.setTitle(this.translate.instant('title.taxon') + this.translate.instant('title.post'))
  }
}
