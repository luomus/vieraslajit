import { Component, OnInit, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { PagedResult } from '../../shared/model/PagedResult';
import { Taxonomy, TaxonomyDescription, TaxonomyImage } from '../../shared/model/Taxonomy';
import { TaxonService } from '../../shared/service/taxon.service';
import { Informal } from '../../shared/model/Informal';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';
import { OmnisearchComponent } from '../../shared/omnisearch/omnisearch.component'
import * as $ from 'jquery';


@Component({
  selector: 'vrs-taxon-list',
  templateUrl: './taxon-list.component.html',
  styleUrls: ['./taxon-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaxonListComponent implements OnInit, OnDestroy {

  @Input() search = '';
  private subTrans: Subscription;
  private navSub: Subscription;
  public loading = true;
  id: string;
  taxa: Taxonomy[];
  page: PagedResult<Taxonomy>;
  groups: Informal[];
  selectedGroup: Informal;
  media: Array<TaxonomyImage>;
  columns = [];
  showGroups = true;
  currentPage = 1;
  pageData = [];
  maxSize = 5;
  itemsPerPage = 12;

  constructor(private taxonService: TaxonService, private translate: TranslateService, private router: Router) { }

  ngOnInit() {
    this.subTrans = this.translate.onLangChange.subscribe(this.update.bind(this));
    this.navSub = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.showGroups = true;
        this.selectedGroup = null;
      }
    })
    this.update();
  }


  update() {
    this.taxonService.getInformalGroups(this.translate.currentLang).subscribe((data) => {
      this.groups = data.results;
      this.loading = false;
    }, error => error, () => {
      if (this.selectedGroup) {
        this.selectedGroup = this.groups.filter(val => val.id === this.selectedGroup.id).pop();
        this.onGroupSelect(this.selectedGroup);
      }
    });
    this.columns = [
      { prop: 'vernacularName', name: this.translate.instant('taxonomy.folkname'), canAutoResize: true, draggable: false, resizeable: false, minWidth: 150 },
      { prop: 'scientificName', name: this.translate.instant('taxonomy.scientificname'), canAutoResize: true, draggable: false, resizeable: false, minWidth: 150 },
      { prop: 'stableString', name: this.translate.instant('taxonomy.established'), draggable: false, canAutoResize: false, headerClass: 'mobile-hidden', cellClass: 'mobile-hidden', resizeable: false },
      { prop: 'onEUList', name: this.translate.instant('taxonomy.onEuList'), draggable: false, canAutoResize: false, headerClass: 'mobile-hidden', cellClass: 'mobile-hidden', resizeable: false },
      { prop: 'onNationalList', name: this.translate.instant('taxonomy.finnishList'), draggable: false, canAutoResize: false, headerClass: 'mobile-hidden', cellClass: 'mobile-hidden', resizeable: false },
      { prop: 'isQuarantinePlantPest', name: this.translate.instant('taxonomy.list.quarantinePlantPest'), draggable: false, canAutoResize: false, headerClass: 'mobile-hidden', cellClass: 'mobile-hidden', resizeable: false }
    ];
  }


  onGroupSelect(target, pageNumber: string = '1') {
    this.loading = true;
    this.selectedGroup = target;
    this.taxonService.getTaxonomy('MX.37600', this.selectedGroup.id, this.translate.currentLang, pageNumber, true).subscribe(data => {
      this.page = data;
      this.taxa = data.results;
      this.taxa.forEach(element => {
        if (!element.vernacularName) {
          element.vernacularName = element.scientificName;
        }
        if (element.administrativeStatuses) {
          element.onEUList = this.translate.instant(String(element.administrativeStatuses.some(value => value === 'MX.euInvasiveSpeciesList')));
          element.onNationalList = this.translate.instant(String(element.administrativeStatuses.some(value => value === 'MX.nationallySignificantInvasiveSpecies')));
          element.isQuarantinePlantPest = this.translate.instant(String(element.administrativeStatuses.some(value => value === 'MX.quarantinePlantPest')));
        } else {
          element.onEUList = this.translate.instant(String(false));
          element.onNationalList = this.translate.instant(String(false));
          element.isQuarantinePlantPest = this.translate.instant(String(false));
        }
        if (element.invasiveSpeciesEstablishment) {
          if (element.invasiveSpeciesEstablishment === 'MX.invasiveNotYetInFinland') {
            element.stableString = this.translate.instant(String('stableString.notyet'));
          }
          if (element.invasiveSpeciesEstablishment === 'MX.invasiveEstablishmentUnknown') {
            element.stableString = this.translate.instant(String('stableString.unknown'));
          }
          if (element.invasiveSpeciesEstablishment === 'MX.invasiveEstablished') {
            element.stableString = this.translate.instant(String('stableString.established'));
          }
          if (element.invasiveSpeciesEstablishment === 'MX.invasiveSporadic') {
            element.stableString = this.translate.instant(String('stableString.sporadic'));
          }
          if (element.invasiveSpeciesEstablishment === 'MX.invasiveAccidental') {
            element.stableString = this.translate.instant(String('stableString.accidental'));
          }
        }
        if (element.multimedia) {
          element.thumbnail = element.multimedia[0].thumbnailURL;
        } else {
          element.thumbnail = 'assets/images/logos/vieraslaji-logo-b.png';
        }
      });
      this.pageData = this.taxa.slice(0, this.itemsPerPage);
    }, () => null, () => this.loader());
  }
  // if loading true => false, removes spinner
  loader() {
    if (this.loading) {
      this.loading = false;
    }
  }

  onSelect(event) {
    this.router.navigate(['/taxon', event.selected.shift().id]);
  }

  setPage(event) {
    $('html, body').animate({ scrollTop: 0 }, 0);
  }

  changeOpen() {
    this.showGroups = !this.showGroups;
  }

  onPageChange() {
    $('html, body').animate({ scrollTop: 0 }, 0);
  }

  pageChanged(event) {
    let start = (event.page - 1) * event.itemsPerPage;
    let end = start + event.itemsPerPage;
    this.pageData = this.taxa.slice(start, end);
    this.onPageChange();
  }

  ngOnDestroy() {
    this.subTrans.unsubscribe();
    if (this.navSub) {
      this.navSub.unsubscribe();
    }
  }

}
