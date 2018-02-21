import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { PagedResult } from '../../shared/model/PagedResult';
import { Taxonomy, TaxonomyDescription } from '../../shared/model/Taxonomy';
import { TaxonService } from '../../shared/service/taxon.service';
import { Informal } from '../../shared/model/Informal';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'vrs-taxon-list',
  templateUrl: './taxon-list.component.html',
  styleUrls: ['./taxon-list.component.scss']
})
export class TaxonListComponent implements OnInit {

  @Input() search = '';

  private selected = [];
  private taxa$: Taxonomy[];
  private groups$: Informal[];
  private selectedGroup: Informal;
  private subTrans: Subscription;

  constructor(private taxonService: TaxonService, private translate: TranslateService) { }

  ngOnInit() {
    this.subTrans = this.translate.onLangChange.subscribe(this.refresh.bind(this));
    this.taxonService.getInformalGroups(this.translate.currentLang).subscribe((data) => {
      this.groups$ = data.results;
    });
  }

  refresh() {
    this.taxonService.getInformalGroups(this.translate.currentLang).subscribe((data) => {
      this.groups$ = data.results;
    });
    if(this.selectedGroup){
      this.onGroupSelect(this.selectedGroup);
    }
  }

  onSearchChange(value) {
    let _selected = [];
    for (let t of this.taxa$) {
      if ((t.vernacularName && t.vernacularName.toUpperCase().includes(value.toUpperCase())) ||
        (t.scientificName.toUpperCase().includes(value.toUpperCase()))) {
        _selected.push(t);
      }
    }
    this.selected = _selected;
  }

  onGroupSelect(target) {
    this.selectedGroup = target;
    this.taxonService.getTaxonomy('MX.37600', this.selectedGroup.id, this.translate.currentLang).subscribe(data => {
      this.taxa$ = data.results;
      this.selected = this.taxa$;
    });
  }

  ngOnDestroy(){
    this.subTrans.unsubscribe();
  }

}
