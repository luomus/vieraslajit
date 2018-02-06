import { Component, OnInit } from '@angular/core';
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

  taxon = [
    { name: "ruokosammakko" },
    { name: "espanjansiruetana" },
    { name: "jalohaukka" }
  ];

  constructor( ) { }

  ngOnInit() {
  }

}
