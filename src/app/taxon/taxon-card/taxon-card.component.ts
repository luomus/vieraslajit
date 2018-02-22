import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaxonService } from '../../shared/service/taxon.service';
import { TaxonomyDescription, TaxonomyImage, Taxonomy } from '../../shared/model/Taxonomy';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'vrs-taxon-card',
  templateUrl: './taxon-card.component.html',
  styleUrls: ['./taxon-card.component.scss']
})

export class TaxonCardComponent implements OnInit, OnDestroy {

  private id: string;
  private sub: any;
  private subTrans: Subscription;

  taxon: Taxonomy;
  desc: TaxonomyDescription;
  media: Array<TaxonomyImage>;
  family: Array<Taxonomy>;

  constructor(private route: ActivatedRoute, private taxonService: TaxonService, private translate: TranslateService) { }

  ngOnInit() {

    this.subTrans = this.translate.onLangChange.subscribe(this.update.bind(this));
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
    });
    this.update();
  }

  update() {
    this.taxonService.getTaxon(this.id, this.translate.currentLang).subscribe(data => {
      this.taxon = data;
    });
    this.taxonService.getTaxonDescription(this.id, this.translate.currentLang).subscribe(data => {
      this.desc = data[0];
      console.log(data);
    });
    this.taxonService.getTaxonMedia(this.id, this.translate.currentLang).subscribe(data => {
      this.media = data;
    });
    this.taxonService.getTaxonParents(this.id, this.translate.currentLang).subscribe(data => {
      if (data.some(e => e.taxonRank === 'MX.subfamily')) {
        this.family = data.filter(value => value.taxonRank === 'MX.subfamily');
      } else {
        this.family = data.filter(value => value.taxonRank === 'MX.family');
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.subTrans.unsubscribe();
  }
}
