import { Component, OnInit, OnDestroy, TemplateRef, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaxonomyDescription, TaxonomyImage, Taxonomy } from '../../shared/model/Taxonomy';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { TaxonCardFacade } from './taxon-card.facade';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'vrs-taxon-card',
  templateUrl: './taxon-card.component.html',
  styleUrls: ['./taxon-card.component.scss']
})
export class TaxonCardComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  mapToggle = true;

  modalRef: BsModalRef;
  selectedImage: TaxonomyImage;

  taxon: Taxonomy;
  desc: TaxonomyDescription;
  media: Array<TaxonomyImage>;

  quarantinePlantPest = false;

  constructor(private route: ActivatedRoute,
              private translate: TranslateService,
              private modalService: BsModalService,
              private renderer: Renderer2,
              private facade: TaxonCardFacade) {}

  ngOnInit() {
    this.facade.state$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((state) => {
        this.taxon = state.taxon
        this.desc = state.description
        this.media = state.media
        this.quarantinePlantPest = state.quarantinePlantPest
      });
    this.route.params
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(params => {
        this.facade.loadTaxon(params['id'])
        this.scrollTop();
      });
    this.translate.onLangChange
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.facade.loadTaxon(this.route.snapshot.params['id']));

    this.renderer.listen(window, 'resize', () => {
      this.onResize();
    })
    this.onResize();
  }

  onResize() {
    if (window.innerWidth < 768) {
      this.mapToggle = false;
    } else {
      this.mapToggle = true;
    }
  }

  scrollTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  openImage(template: TemplateRef<any>, image: TaxonomyImage) {
    this.selectedImage = image;
    this.modalRef = this.modalService.show(template, { class: 'modal-lg', animated:false });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
