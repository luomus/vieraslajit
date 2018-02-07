import { Component, OnInit, Input } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { PagedResult } from '../../shared/model/PagedResult';
import { Taxonomy, TaxonomyDescription } from '../../shared/model/Taxonomy';
import { TaxonService } from '../../shared/service/taxon.service';
import { Informal } from '../../shared/model/Informal';

@Component({
  selector: 'vrs-taxon-list',
  templateUrl: './taxon-list.component.html',
  styleUrls: ['./taxon-list.component.scss']
})
export class TaxonListComponent implements OnInit {

  @Input() search = '';

  selected = [];

  taxa = [
    { name: "Ruokosammakko", class: "Sammakkoeläimet", id: "1" },
    { name: "Espanjansiruetana", class: "Kotilot", id: "2" },
    { name: "Jalohaukat", class: "Linnut", id: "3" }
  ];

  taxa$: Taxonomy[];
  groups$: Informal[];
  selectedGroup: Informal;

  constructor(private taxonService: TaxonService) { }

  ngOnInit() {
    this.taxonService.getInformalGroups('fi').subscribe((data) => {
      this.groups$ = data.results;
    });
  }

  onSearchChange(value) {
    let _selected = [];
    for (let t of this.taxa$) {
      if (t.vernacularName.toUpperCase().includes(value.toUpperCase())
        || t.scientificName.toUpperCase().includes(value.toUpperCase())) {
        _selected.push(t);
      }
    }
    this.selected = _selected;
  }

  onGroupSelect(target) {
    this.selectedGroup = target;
    console.log(this.selectedGroup.id);
    this.taxonService.getTaxonomy('MX.37600', this.selectedGroup.id).subscribe(data => {
      this.taxa$ = data.results;
      this.selected = this.taxa$;
    });
  }

}
