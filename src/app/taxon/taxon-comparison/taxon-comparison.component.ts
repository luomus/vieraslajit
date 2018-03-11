import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Taxonomy } from '../../shared/model/Taxonomy';
import { TaxonService } from '../../shared/service/taxon.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'vrs-taxon-comparison',
  templateUrl: './taxon-comparison.component.html',
  styleUrls: ['./taxon-comparison.component.scss']
})
export class TaxonComparisonComponent implements OnInit, OnDestroy {

  @Input() taxon: Taxonomy;

  groups = [];
  taxonomy: Taxonomy[];

  constructor(private taxonService: TaxonService, private translate: TranslateService) { }

  ngOnInit() {
    if (this.taxon) {
      this.taxon.informalTaxonGroups.forEach((elem, index, arr) => {
        this.taxonService.getGroupChildren(elem).subscribe((data) => {
          if (data.results.length === 0) {
            this.groups.push(elem);
          }
        }, err => err, () => {
          if (index === arr.length - 1) {
            this.getTaxon();
          }
        });
      });
    }
  }

  getTaxon() {
    console.log(this.translate.currentLang);
    this.groups.forEach(elem => {
      this.taxonService.getComparisonTaxonomy('MX.37600', elem, this.translate.currentLang).subscribe(data => {
        this.taxonomy = data.results;
      });
    });
  }

  ngOnDestroy() {
  }

}
