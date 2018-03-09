import { Component, OnInit, Input } from '@angular/core';
import { Taxonomy } from '../../shared/model/Taxonomy';
import { TaxonService } from '../../shared/service/taxon.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'vrs-taxon-comparison',
  templateUrl: './taxon-comparison.component.html',
  styleUrls: ['./taxon-comparison.component.scss']
})
export class TaxonComparisonComponent implements OnInit {

  /*   @Input() taxa: Taxonomy;
   */

  taxa = {
    informalTaxonGroups: [
      'MVL.1',
      'MVL.36'
    ]
  };
  groups = [];

  constructor(private taxonService: TaxonService, private translate: TranslateService) { }

  ngOnInit() {
    if (this.taxa) {
      this.taxa.informalTaxonGroups.forEach((elem, index, arr) => {
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
    this.groups.forEach(elem => {
      this.taxonService.getComparisonTaxonomy('MX.37600', elem, this.translate.currentLang).subscribe(data => {
        console.log(data.results);
      });
    });
  }

}
