import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { PagedResult } from '../../shared/model/PagedResult';
import { Taxonomy, TaxonomyDescription, TaxonomyImage } from '../../shared/model/Taxonomy';
import { TaxonService } from '../../shared/service/taxon.service';
import { Informal } from '../../shared/model/Informal';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';
import { OmnisearchComponent } from '../../shared/omnisearch/omnisearch.component'

@Component({
  selector: 'vrs-taxon-list',
  templateUrl: './taxon-list.component.html',
  styleUrls: ['./taxon-list.component.scss']
})
export class TaxonListComponent implements OnInit, OnDestroy {

  @Input() search = '';

  private subTrans: Subscription;

  id: string;
  selected = [];
  taxa: Taxonomy[];
  changeView: false;
  groups: Informal[];
  selectedGroup: Informal;
  media: Array<TaxonomyImage>;


  constructor(private taxonService: TaxonService, private translate: TranslateService) { }

  ngOnInit() {
    this.subTrans = this.translate.onLangChange.subscribe(this.update.bind(this));
    this.update();
  }

  update() {
    this.taxonService.getInformalGroups(this.translate.currentLang).subscribe((data) => {
      this.groups = data.results;
    });
    if (this.selectedGroup) {
      this.onGroupSelect(this.selectedGroup);
    }
  }

  onSearchChange(value) {
    let _selected = [];
    for (let t of this.taxa) {
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
      this.taxa = data.results;
      this.taxa.forEach(element => {
        this.taxonService
          .getTaxonMedia(element.id, 'fi').subscribe(data => {
            if (data.length > 0) {
              element.thumbnail = data[0].thumbnailURL;
            } else {
              element.thumbnail = 'assets/images/logos/vieraslaji-logo-70x70.png';
            }
          });
      });
      this.selected = this.taxa;
    });
    this.myScroller();
  }

  myScroller() {
    setTimeout(function () {
      var scroller = document.getElementById("autoscroll");
      scroller.scrollTop = scroller.scrollHeight;
      scroller.scrollIntoView();
    }, 0);
  }

  ngOnDestroy() {
    this.subTrans.unsubscribe();
  }

}
