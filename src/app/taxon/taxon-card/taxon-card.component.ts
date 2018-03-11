import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  private sub: any;
  private subTrans: Subscription;

  id: string;
  taxon: Taxonomy;
  desc: TaxonomyDescription;
  media: Array<TaxonomyImage>;
  family: Array<Taxonomy>;
  quarantinePlantPest: boolean;  //Vaarallinen kasvintuhoaja
  comparison = false;
  constructor(private route: ActivatedRoute, private router: Router,
    private taxonService: TaxonService, private translate: TranslateService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit() {
    this.subTrans = this.translate.onLangChange.subscribe(this.update.bind(this));
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
    });
    this.scrollTop();
    this.update();
  }

  update() {
    this.taxonService.getTaxon(this.id, this.translate.currentLang).subscribe(data => {
      this.taxon = data;
      this.quarantinePlantPest = this.taxon.administrativeStatuses.includes("MX.quarantinePlantPest");
    });
    this.taxonService.getTaxonDescription(this.id, this.translate.currentLang).subscribe(data => {
      this.desc = data[0];
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

  comparisonView() {
    this.comparison = !this.comparison;
  }

  scrollTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.subTrans.unsubscribe();
  }
}
