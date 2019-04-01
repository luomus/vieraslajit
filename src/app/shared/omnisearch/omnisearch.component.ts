import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  ViewContainerRef,
  OnChanges,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  ViewChild,
  Renderer2
} from '@angular/core';
import { Subscription, of } from 'rxjs'
import { tap, combineLatest } from 'rxjs/operators'
import { FormControl } from '@angular/forms'
import { TaxonService } from '../../shared/service/taxon.service'
import { ApiService } from '../../shared/api/api.service';
import { Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core';
import { GoogleSearchApiService } from '../api/google-search.api.service';
import { environment } from '../../../environments/environment';
import { isDescendant } from '../../utils';



@Component({
  selector: 'vrs-omnisearch',
  templateUrl: './omnisearch.component.html',
  styleUrls: ['./omnisearch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OmnisearchComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {

  @Input() limit: 10;
  @Input() selectTo = '/taxon';
  @Input() minLength = 3;
  @Input() visible = true;
  @Input() expand = '';
  @Input() comparisonView: boolean;
  @Output() visibleTaxon = new EventEmitter<any>();
  public search = '';
  public searchControl:FormControl = new FormControl();
  public active = 0;
  public taxa = [];
  public content = {}
  public taxon: any;
  public loading = false;

  public open = false;

  private subTaxa: Subscription;
  private subCnt: Subscription;
  private inputChange: Subscription;
  private el: Element;

  resultsDirection = 'right';

  contentMode: 'taxon' | 'content' = 'taxon';

  googleApiLoading = false;

  // Informal Taxon Group ID of currently selected taxon
  groupId = '';

  @ViewChild('omniElement') omniElement: ElementRef;
  @ViewChild('omniInput') omniInput: ElementRef;


  constructor(

    private changeDetector: ChangeDetectorRef,
    private apiService: ApiService,
    private taxonservice: TaxonService,
    private router: Router,
    private translate: TranslateService,
    private renderer: Renderer2,
    private googleApi: GoogleSearchApiService,
    viewContainerRef: ViewContainerRef
  ) {
    this.el = viewContainerRef.element.nativeElement;
  }

  ngOnInit() {
    this.inputChange = this.searchControl.valueChanges.pipe(tap(val=>{
      this.search = val;
      if (val.length > 2) {
        this.open = true;
      } else {
        this.open = false;
      }
    })).subscribe(()=>{
      this.updateTaxa();
    })
  }

  ngAfterViewInit() {
    const el: HTMLElement = this.omniElement.nativeElement;
    if((el.clientLeft - el.clientWidth) > (window.innerWidth / 2)) {
      this.resultsDirection = 'left';
    } else {
      this.resultsDirection = 'right';
    }
    this.renderer.listen(this.omniInput.nativeElement, 'focus', (e) => {
      if (this.searchControl.value && this.searchControl.value.length > 2) {
        this.open = true;
        this.changeDetector.markForCheck();
      }
    });
    this.renderer.listen(window, 'click', (e) => {
      if (isDescendant(this.omniElement.nativeElement, e.target)) {

      } else {
        this.open = false;
        this.changeDetector.markForCheck();
      }
    });
  }
  
  ngOnChanges() {
    this.updateTaxa();

  }
  ngOnDestroy() {
    if (this.inputChange) {
      this.inputChange.unsubscribe();
    }
    if (this.subCnt) {
      this.subCnt.unsubscribe();
    }
    if (this.subTaxa) {
      this.subTaxa.unsubscribe();
    }
  }

  close() {
    this.searchControl.setValue('');
    this.search = '';
    this.taxa = [];
  }

  activate(index: number): void {
    this.groupId = '';
    if (this.taxa[index]) {
      // show the right informal group image
      let compatibleTaxonGroups = ['MVL.1', 'MVL.2', 'MVL.21', 'MVL.22', 'MVL.26', 'MVL.27', 'MVL.28',
                                   'MVL.37', 'MVL.39', 'MVL.40', 'MVL.41', 'MVL.232', 'MVL.233', 'MVL.343'];
      compatibleTaxonGroups.forEach(g => {
        this.taxa[index].payload.informalTaxonGroups.forEach(t => {
          if(t.id == g) {
            this.groupId = g;
          }
          this.changeDetector.markForCheck();
        });
      });

      this.active = index;
      this.taxon = this.taxa[index];
      this.subCnt = of(this.taxon.key).pipe(
      combineLatest(
        this.taxonservice.getWareHouseQueryCount('count', 'fi', this.taxon.key),
        (id, cnt) => {
          return { id: id, cnt: cnt.total };
        }))
        .subscribe(data => {
          this.taxa.map(auto => {
            if (auto.key === data.id) {
              auto['count'] = data.cnt;
            }
          });
          this.visibleTaxon.emit(this.taxa[index]);
          this.changeDetector.markForCheck();
        });

    } else {
      this.taxon = undefined;
    }

  }

  keyEvent(e) {
    // up key
    if (e.keyCode === 38) {
      if (this.taxa[this.active - 1]) {
        this.activate(this.active - 1);
      }
    }
    //down key
    if (e.keyCode === 40) {
      if (this.taxa[this.active + 1]) {
        this.activate(this.active + 1);
      }
    }
    //Enter
    if (e.keyCode === 13) {
      if (this.taxa[this.active]) {
        this.router.navigate([this.selectTo, this.taxa[this.active].key]);
        this.close();
      }
    }

  }

  contentSearch() {
    this.googleApiLoading = true;
    this.googleApi.list(this.searchControl.value).subscribe((data)=> {
      this.content = data;
      this.changeDetector.markForCheck();
      this.googleApiLoading = false;
    })
  }

  private updateTaxa() {

    if (this.search.length < this.minLength) {
      this.loading = false;
      this.changeDetector.markForCheck();
      return;
    }

    this.loading = true;
    this.subTaxa = this.taxonservice.getAutocomplete('taxon', this.search, this.translate.currentLang).subscribe(

      data => {
        this.taxa = data;
        this.loading = false;
        this.activate(0);
        this.changeDetector.markForCheck();
      }
    );



  }

  formatContentUrl(input: string) {
    return input.replace(environment.baseUrl, '');
  }
}