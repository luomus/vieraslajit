import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { PagedResult } from '../../shared/model/PagedResult';
import { Taxonomy, TaxonomyDescription, TaxonomyImage } from '../../shared/model/Taxonomy';
import { TaxonService } from '../../shared/service/taxon.service';
import { Informal } from '../../shared/model/Informal';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'vrs-taxon-list',
  templateUrl: './taxon-list.component.html',
  styleUrls: ['./taxon-list.component.scss']
})
export class TaxonListComponent implements OnInit {

  @Input() search = '';

  id: string;
  selected = [];
  changeView: false;
  media$: Array<TaxonomyImage>;
  taxa$: Taxonomy[];
  groups$: Informal[];
  selectedGroup: Informal;

  constructor(private taxonService: TaxonService, private translateService: TranslateService) { }

  ngOnInit() {
    this.taxonService.getInformalGroups(this.translateService.currentLang).subscribe((data) => {
      this.groups$ = data.results;
    });

    this.taxonService.getTaxonMedia(this.id, this.translateService.currentLang).subscribe(data => {
      this.media$ = data;
    });
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
    this.taxonService.getTaxonomy('MX.37600',  this.selectedGroup.id, this.translateService.currentLang).subscribe(data => {
      this.taxa$ = data.results;
      this.selected = this.taxa$;
    });
  }
}
