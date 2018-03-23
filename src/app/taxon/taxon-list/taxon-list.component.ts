import { Component, OnInit, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { PagedResult } from '../../shared/model/PagedResult';
import { Taxonomy, TaxonomyDescription, TaxonomyImage } from '../../shared/model/Taxonomy';
import { TaxonService } from '../../shared/service/taxon.service';
import { Informal } from '../../shared/model/Informal';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';
import { OmnisearchComponent } from '../../shared/omnisearch/omnisearch.component'


@Component({
  selector: 'vrs-taxon-list',
  templateUrl: './taxon-list.component.html',
  styleUrls: ['./taxon-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaxonListComponent implements OnInit, OnDestroy {

  @Input() search = '';
  private subTrans: Subscription;

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
    this.update();
  }

  update() {
    this.taxonService.getInformalGroups(this.translate.currentLang).subscribe((data) => {
      this.groups = data.results;
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
      { prop: 'onNationalList', name: this.translate.instant('taxonomy.finnishList'), draggable: false, canAutoResize: false, headerClass: 'mobile-hidden', cellClass: 'mobile-hidden', resizeable: false }
    ];
  }


  onGroupSelect(target, pageNumber: string = '1') {
    this.selectedGroup = target;
    this.taxonService.getTaxonomy('MX.37600', this.selectedGroup.id, this.translate.currentLang, pageNumber).subscribe(data => {
      this.page = data;
      this.taxa = data.results;
      this.taxa.forEach(element => {
        if (!element.vernacularName) {
          element.vernacularName = element.scientificName;
        }
        if (element.administrativeStatuses) {
          element.onEUList = this.translate.instant(String(element.administrativeStatuses.some(value => value === 'MX.euInvasiveSpeciesList')));
          element.onNationalList = this.translate.instant(String(element.administrativeStatuses.some(value => value === 'MX.nationallySignificantInvasiveSpecies')));
        } else {
          element.onEUList = this.translate.instant(String(false));
          element.onNationalList = this.translate.instant(String(false));
        }
        if(element.invasiveSpeciesEstablishment){ 
          if(element.invasiveSpeciesEstablishment === 'MX.invasiveNotYetInFinland'){
            element.stableString = this.translate.instant(String('stableString.notyet'));
          }   
          if(element.invasiveSpeciesEstablishment === 'MX.invasiveEstablishmentUnknown'){
            element.stableString = this.translate.instant(String('stableString.unknown'));
          }
          if(element.invasiveSpeciesEstablishment === 'MX.invasiveEstablished'){
            element.stableString = this.translate.instant(String('stableString.established'));
          }
          if(element.invasiveSpeciesEstablishment === 'MX.invasiveSporadic'){
            element.stableString = this.translate.instant(String('stableString.sporadic'));
          }
          if(element.invasiveSpeciesEstablishment ==='MX.invasiveAccidental'){
            element.stableString =this.translate.instant(String('stableString.accidental'));
          }
          
        } 

        this.taxonService
          .getTaxonMedia(element.id, 'fi').subscribe(data => {
            if (data.length > 0) {
              element.thumbnail = data[0].thumbnailURL;
            } else {
              element.thumbnail = 'assets/images/logos/vieraslaji-logo-b.png';
            }
          });
      });
      this.pageData = this.taxa.slice(0, this.itemsPerPage);
    });
  }

  onSelect(event) {
    this.router.navigate(['/taxon', event.selected.shift().id]);
  }

  setPage(event) {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  changeOpen() {
    this.showGroups = !this.showGroups;
  }

  pageChanged(event) {
    let start = (event.page - 1) * event.itemsPerPage;
    let end = start + event.itemsPerPage;
    this.pageData = this.taxa.slice(start, end);
  }

  ngOnDestroy() {
    this.subTrans.unsubscribe();
  }

}
