import { Component, OnInit, OnDestroy, TemplateRef, Renderer2, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaxonomyDescription, TaxonomyImage, Taxonomy, TaxonomyDescriptionVariable } from '../../shared/model/Taxonomy';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { TaxonCardFacade, TaxonomyDescriptionFlattened } from './taxon-card.facade';
import { takeUntil } from 'rxjs/operators';
import { Title, Meta } from '@angular/platform-browser';
import { environment } from 'environments/environment';
import { removeHTMLTagFragments } from 'app/utils';

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
  desc: TaxonomyDescriptionFlattened;
  media: Array<TaxonomyImage>;

  quarantinePlantPest = false;

  constructor(private route: ActivatedRoute,
              private translate: TranslateService,
              private title: Title,
              private modalService: BsModalService,
              private renderer: Renderer2,
              private facade: TaxonCardFacade,
              private meta: Meta) {}

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
        if (taxon && taxon.vernacularName) {
          this.title.setTitle(taxon.vernacularName.charAt(0).toUpperCase() + taxon.vernacularName.slice(1) + this.translate.instant('title.post'))
          this.meta.updateTag({
            property: "og:title",
            content: this.taxon.vernacularName.charAt(0).toUpperCase() + this.taxon.vernacularName.slice(1) + this.translate.instant('title.post')
          })
        }
      });
    this.facade.description$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((description) => {
        this.desc = description
        if (this.desc) {
          const metaDesc = removeHTMLTagFragments(this.desc.variables[0].content).substr(0, 70)
          this.meta.updateTag({
            property: "og:description",
            content: metaDesc
          })
          this.meta.updateTag({
            property: "description",
            content: metaDesc
          })
        }
      });
    this.facade.media$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((media) => {
        this.media = media
        if (this.media && this.media.length > 0) {
          this.meta.updateTag({
            property: "og:image",
            content: this.media[0].thumbnailURL
          })
        }
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

    this.destroyResizeListener = this.renderer.listen(window, 'resize', this.onResize.bind(this))
    this.onResize(undefined);
  }

  onResize(evt) {
    if (evt && evt['ignore-map-resize']) { return; }
    if (window.innerWidth < 768) {
      this.mapToggle = false;
    } else {
      this.mapToggle = true;
    }
  }

  toggleMap() {
    this.mapToggle = !this.mapToggle;
    try {
      const event = new Event('resize');
      event['ignore-map-resize'] = true;
      window.dispatchEvent(event);
    } catch (e) {
      const evt = window.document.createEvent('UIEvents');
      evt['ignore-map-resize'] = true;
      // @ts-ignore
      evt.initUIEvent('resize', true, false, window, 0);
      window.dispatchEvent(evt);
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
