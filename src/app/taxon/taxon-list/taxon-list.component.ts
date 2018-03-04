import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { PagedResult } from '../../shared/model/PagedResult';
import { Taxonomy, TaxonomyDescription, TaxonomyImage } from '../../shared/model/Taxonomy';
import { TaxonService } from '../../shared/service/taxon.service';
import { Informal } from '../../shared/model/Informal';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';

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
  columns = [];

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
    this.columns = [
      { prop: 'vernacularName', name: this.translate.instant('taxonomy.folkname') },
      { prop: 'scientificName', name: this.translate.instant('taxonomy.scientificname') },
      { prop: 'onEUList', name: this.translate.instant('taxonomy.onEuList') },
      { prop: 'onNationalList', name: this.translate.instant('taxonomy.finnishList') },
      /*   { name: 'taxonomy.established' },
         { name: 'taxonomy.class' } */
    ];
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
        if (element.administrativeStatuses) {
          element.onEUList = element.administrativeStatuses.some(value => value === 'MX.euInvasiveSpeciesList');
          element.onNationalList = element.administrativeStatuses.some(value => value === 'MX.nationallySignificantInvasiveSpecies');
        } else {
          element.onEUList = false;
          element.onNationalList = false;
        }
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
    }, 500);
  }

  ngOnDestroy() {
    this.subTrans.unsubscribe();
  }

}
