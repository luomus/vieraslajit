import { Component, OnInit, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaxonService } from '../../shared/service/taxon.service';
import { TaxonomyDescription, TaxonomyImage, Taxonomy } from '../../shared/model/Taxonomy';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'vrs-taxon-card',
  templateUrl: './taxon-card.component.html',
  styleUrls: ['./taxon-card.component.scss']
})

export class TaxonCardComponent implements OnInit, OnDestroy {
  private sub: Subscription;
  private onLangChange: Subscription;
  public loading = true; // spinner true on start

  id: string;
  taxon: Taxonomy;
  desc: TaxonomyDescription;
  media: Array<TaxonomyImage>;
  family: Array<Taxonomy>;
  quarantinePlantPest: boolean;  // Vaarallinen kasvintuhoaja
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
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      if(this.first) {
        this.first = false;
      }
      this.scrollTop();
      this.update();
    });
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

  scrollTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  ngOnDestroy() {
    this.sub ? this.sub.unsubscribe() : null;
    this.onLangChange ? this.onLangChange.unsubscribe() : null;
  }

  openImage(template: TemplateRef<any>, image: TaxonomyImage) {
    this.selectedImage = image;
    this.modalRef = this.modalService.show(template, { class: 'modal-lg', animated:false });
  }

}
