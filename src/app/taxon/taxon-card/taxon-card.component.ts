import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaxonService } from '../../shared/service/taxon.service';
import { TaxonomyDescription } from '../../shared/model/Taxonomy';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'vrs-taxon-card',
  templateUrl: './taxon-card.component.html',
  styleUrls: ['./taxon-card.component.scss']
})

export class TaxonCardComponent implements OnInit, OnDestroy {

  id: string;
  private sub: any;
  desc$: TaxonomyDescription;

  constructor(private route: ActivatedRoute, private taxonService: TaxonService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
    });
    this.taxonService.getTaxonDescription(this.id, 'fi').subscribe(data => {
      this.desc$ = data[0];
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
