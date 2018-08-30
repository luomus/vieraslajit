import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Taxonomy, TaxonomyImage } from '../../shared/model/Taxonomy';
import { TaxonService } from '../../shared/service/taxon.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'vrs-taxon-comparison',
  templateUrl: './taxon-comparison.component.html',
  styleUrls: ['./taxon-comparison.component.scss']
})
export class TaxonComparisonComponent implements OnInit, OnDestroy {

  taxon: Taxonomy;
  media: TaxonomyImage[];
  private subTrans: Subscription;

  taxonId;
  loading: boolean = true;
  hasTaxonomy: boolean;
  groups = [];
  taxonomy: Taxonomy[] = [];
  multimedia: TaxonomyImage[];
  selected: Taxonomy;
  current = 0;
  lang: string;
  

  constructor(private route: ActivatedRoute, private taxonService: TaxonService, private translate: TranslateService) { }

  ngOnInit() {
    this.route.params.subscribe((params)=>{
      this.taxonId = params['id'];
      this.getTaxon(this.taxonId).subscribe({complete: ()=>{
        this.update();
      }});
    });
    this.subTrans = this.translate.onLangChange.subscribe(this.update.bind(this));
  }

  next() {
    this.current = this.current + 1;
    if (this.current > this.taxonomy.length - 1) {
      this.current = 0;
    }
    this.selected = this.taxonomy[this.current];
  }

  prev() {
    this.current = this.current - 1;
    if (this.current < 0) {
      this.current = this.taxonomy.length - 1;
    }
    this.selected = this.taxonomy[this.current];
  }

  changeSelected(event) {
    this.selected = this.taxonomy[event];
    this.current = event;
  }

  hasTaxonomys() {
    return this.hasTaxonomy;
  }

  update() {
    this.lang = this.translate.currentLang;
    if (this.taxon) {
      this.taxon.informalTaxonGroups.forEach((elem, index, arr) => {
        this.taxonService.getGroupChildren(elem).subscribe((data) => {
          if (data.total === 0) {
            this.groups.push(elem);
            this.getComparisonTaxon(elem);
          }
        }, err => err, () => {
          if (index === arr.length - 1) {
            setInterval(() => {
              this.loading = false;
            }, 2000);
          }
        });
      });
    }
  }

  getComparisonTaxon(elem) {
    this.taxonService.getComparisonTaxonomy('MX.37600', elem, this.translate.currentLang).subscribe(data => {
      this.taxonomy = this.taxonomy.concat(data.results.filter(taxon => taxon.id != this.taxon.id));
      this.selected = this.taxonomy[this.current];
      if (this.taxonomy.length > 0) {
        this.hasTaxonomy = true;
      } else {
        this.hasTaxonomy = false;
      }
    }, err => err, () => {
      this.loading = false;
    });
  }

  getTaxon(id){
    return new Observable(observer=>{
      let i = 0;
      this.taxonService.getTaxon(id, this.translate.currentLang).subscribe((res)=>{
        this.taxon = res;
        i++;
        if(i>1) observer.complete();
      });
      this.taxonService.getTaxonMedia(id, this.translate.currentLang).subscribe((res)=>{
        this.media = res;
        i++;
        if(i>1) observer.complete();
      });
    });
  }

  ngOnDestroy() {
    this.subTrans.unsubscribe();
  }
}