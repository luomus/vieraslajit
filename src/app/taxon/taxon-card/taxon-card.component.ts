import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaxonService } from '../../shared/service/taxon.service';
import { TaxonomyDescription, TaxonomyImage, Taxonomy } from '../../shared/model/Taxonomy';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'vrs-taxon-card',
  templateUrl: './taxon-card.component.html',
  styleUrls: ['./taxon-card.component.scss']
})

export class TaxonCardComponent implements OnInit, OnDestroy {

  id: string;
  taxon: Taxonomy;
  private sub: any;
  desc$: TaxonomyDescription;
  media$: Array<TaxonomyImage>;
  quarantinePlantPest: boolean;  //Vaarallinen kasvintuhoaja

  constructor(private route: ActivatedRoute, private taxonService: TaxonService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
    });
    this.taxonService.getTaxon(this.id).subscribe(data => {
      this.taxon = data;
      this.quarantinePlantPest = this.taxon.administrativeStatuses.includes("MX.quarantinePlantPest");
    });
    this.taxonService.getTaxonDescription(this.id, 'fi').subscribe(data => {
      this.desc$ = data[0];
    });
    this.taxonService.getTaxonMedia(this.id, 'fi').subscribe(data => {
      this.media$ = data;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
