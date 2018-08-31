import { Component, OnInit, OnDestroy, Input, ViewEncapsulation, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaxonService } from '../../shared/service/taxon.service';
import { TaxonomyDescription, TaxonomyImage, Taxonomy } from '../../shared/model/Taxonomy';
import { Observable ,  Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap';

import { OmnisearchComponent } from '../../shared/omnisearch/omnisearch.component';

@Component({
  selector: 'vrs-taxon-card',
  templateUrl: './taxon-card.component.html',
  styleUrls: ['./taxon-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class TaxonCardComponent implements OnInit, OnDestroy {
  @ViewChild(OmnisearchComponent) omnisearch:OmnisearchComponent;

  private sub: Subscription;
  private onLangChange: Subscription;
  public loading = true; // spinner true on start

  id: string;
  taxon: Taxonomy;
  desc: TaxonomyDescription;
  media: Array<TaxonomyImage>;
  family: Array<Taxonomy>;
  quarantinePlantPest: boolean;  // Vaarallinen kasvintuhoaja
  comparison: boolean;
  isFirstOpen: boolean;
  customClass: string;
  selectedImage: TaxonomyImage;
  modalRef: BsModalRef;
  lang: string;

  private first=true;

  constructor(private route: ActivatedRoute,
    private taxonService: TaxonService, private translate: TranslateService, private modalService: BsModalService) {

  }

  ngOnInit() {
    this.isFirstOpen = false;
    this.onLangChange = this.translate.onLangChange.subscribe(this.update.bind(this));
    this.comparison = false;
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      /* Don't run omnisearch.close on the first route change */
      if(this.first) {
        this.first = false;
      } else {
        this.omnisearch.close();
      }
      this.scrollTop();
      this.update();
    });
    this.scrollTop();
    this.update();
  }

  update() {
    this.lang = this.translate.currentLang;
    this.taxonService.getTaxon(this.id, this.translate.currentLang).subscribe(data => {
      this.taxon = data;
      if (this.taxon.administrativeStatuses) {
        this.quarantinePlantPest = this.taxon.administrativeStatuses.includes('MX.quarantinePlantPest');
      }
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
    }, () => null, () => this.loader()); // spinner to false
  }

  // if loading true => false, removes spinner
  loader() {
    if (this.loading) {
      this.loading = false;
    }
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
    this.onLangChange.unsubscribe();
  }

  openImage(template: TemplateRef<any>, image: TaxonomyImage) {
    this.selectedImage = image;
    this.modalRef = this.modalService.show(template, { class: 'modal-lg', animated:false });
  }

}
