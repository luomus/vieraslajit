import { Component, OnInit, OnDestroy, TemplateRef, Renderer2, ChangeDetectorRef } from '@angular/core';
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
  private destroyResizeListener: () => void;

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
              private facade: TaxonCardFacade,
              private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.facade.state$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((state) => {
        this.quarantinePlantPest = state.quarantinePlantPest
      });
    this.facade.taxon$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((taxon) => {
        this.taxon = taxon
      });
    this.facade.description$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((description) => {
        this.desc = description
      });
    this.facade.media$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((media) => {
        this.media = media
      });
    this.route.params
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(params => {
        this.taxon = undefined;
        this.desc = undefined;
        this.media = undefined;
        this.quarantinePlantPest = undefined;
        this.facade.loadTaxon(params['id'])
        this.scrollTop();
      });
    this.translate.onLangChange
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.facade.loadTaxon(this.route.snapshot.params['id']));

    this.destroyResizeListener = this.renderer.listen(window, 'resize', () => {
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
    if (this.destroyResizeListener) {
      this.destroyResizeListener();
    }
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
