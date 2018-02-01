import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PagedResult } from '../../shared/model/PagedResult';
import { Taxonomy } from '../../shared/model/Taxonomy';
import { TaxonService } from '../../shared/service/taxon.service';
import { Informal } from '../../shared/model/Informal';

@Component({
  selector: 'vrs-taxon-list',
  templateUrl: './taxon-list.component.html',
  styleUrls: ['./taxon-list.component.scss']
})
export class TaxonListComponent implements OnInit {

  groups$: Observable<PagedResult<Informal>>;
  taxon$: Observable<PagedResult<Taxonomy>>;

  taxon = [
    { name: "ruokosammakko" },
    { name: "espanjansiruetana" },
    { name: "jalohaukka" }
  ];

  constructor(
    private taxonService: TaxonService
  ) { }

  ngOnInit() {
    this.groups$ = this.taxonService.getInformalGroups('fi');
    this.taxon$ = this.taxonService.getTaxonomy('MVL.2');
   }

}
