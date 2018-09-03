import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewContainerRef,
  OnChanges,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  ViewChild
} from '@angular/core';
import { Autocomplete } from '../../shared/model/Autocomplete';
import { WarehouseQueryCount } from '../../shared/model/Warehouse'
import { Subscription ,  Observable, of } from 'rxjs'
import { tap, combineLatest } from 'rxjs/operators'
import { FormControl } from '@angular/forms'
import { TaxonService } from '../../shared/service/taxon.service'
import { ApiService } from '../../shared/api/api.service';
import { Router } from '@angular/router'


import * as $ from 'jquery';

import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'vrs-omnisearch',
  templateUrl: './omnisearch.component.html',
  styleUrls: ['./omnisearch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OmnisearchComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {

  @Input() placeholder: string;
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
  public taxon: any;
  public loading = false;

  private subTaxa: Subscription;
  private subCnt: Subscription;
  private inputChange: Subscription;
  private el: Element;

  private resultsDirection = 'right';

  // Informal Taxon Group ID of currently selected taxon
  private groupId = 'MVL.1';

  @ViewChild('omniElement') omniElement: ElementRef;


  constructor(

    private changeDetector: ChangeDetectorRef,
    private apiService: ApiService,
    private taxonservice: TaxonService,
    private router: Router,
    private translate: TranslateService,
    viewContainerRef: ViewContainerRef
  ) {
    this.el = viewContainerRef.element.nativeElement;
  }

  ngOnInit() {
    this.inputChange = this.searchControl.valueChanges.pipe(tap(val=>{
      this.search = val;
    })).subscribe(()=>{
      this.updateTaxa();
    })
  }

  ngAfterViewInit() {
    if(($(this.omniElement.nativeElement).position().left - $(this.omniElement.nativeElement).width()) > ($(window).width() / 2)) {
      this.resultsDirection = 'left';
    } else {
      this.resultsDirection = 'right';
    }
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
    if (this.taxa[index]) {

      // show the right informal group image
      let compatibleTaxonGroups = ['MVL.1', 'MVL.2', 'MVL.21', 'MVL.22', 'MVL.26', 'MVL.27', 'MVL.28',
                                   'MVL.37', 'MVL.39', 'MVL.40', 'MVL.41', 'MVL.232', 'MVL.233'];
      compatibleTaxonGroups.forEach(g => {
        this.taxa[index].payload.informalTaxonGroups.forEach(t => {
          if(t.id == g) {
            this.groupId = g;
          }
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

}
