import { Component, OnInit, Renderer2, Inject, PLATFORM_ID, Output, EventEmitter, OnDestroy, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import * as $ from 'jquery';
import { TranslateService } from "@ngx-translate/core";
import { isPlatformBrowser } from "@angular/common";
import { TaxonService } from "app/shared/service/taxon.service";
import { Taxonomy } from "app/shared/model";
import { fromEvent, Subject } from "rxjs";
import { debounceTime, takeUntil, filter, map, switchMap } from "rxjs/operators";
import { ChangeDetectionStrategy } from "@angular/compiler";

@Component({
    selector: "vrs-taxon-search",
    templateUrl: './taxon-search.component.html',
    styleUrls: ["./taxon-search.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaxonSearchComponent implements AfterViewInit, OnDestroy {
    unsubscribe$ = new Subject<void>();

    autocompleteItems: [];
    selected;

    @ViewChild('autocomplete', { static: false }) autocomplete: ElementRef;
    @ViewChild('input', { static: false }) input: ElementRef;
    @Output() taxonChange = new EventEmitter();

    constructor(
        private taxonService: TaxonService,
        private renderer: Renderer2,
        private cdr: ChangeDetectorRef,
        public translate: TranslateService,
        @Inject(PLATFORM_ID) private platformId
    ) {}

    ngAfterViewInit() {
        fromEvent(this.input.nativeElement, 'input').pipe(
            takeUntil(this.unsubscribe$),
            debounceTime(500)
        ).pipe(
            filter((event: any) => {
                if (event.target.value.length < 3) {
                    this.autocompleteItems = undefined;
                    this.cdr.markForCheck();
                    return false;
                } else {
                    return true
                }
            }),
            map(event => event.target.value),
            switchMap(val => this.taxonService.getAutocomplete(val))
        ).subscribe(r => {
            this.autocompleteItems = r;
            this.cdr.markForCheck();
        });

        fromEvent(document, 'click').pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(event => {
            if (!this.autocomplete.nativeElement.contains(event.target)) {
                this.autocompleteItems = undefined;
                this.cdr.markForCheck();
            }
        })
    }

    onSelect(item) {
        this.taxonChange.emit(item.key);
        this.selected = item;
        this.autocompleteItems = undefined;
        this.input.nativeElement.disabled = true;
        this.input.nativeElement.value = item.value;
    }

    removeSelected() {
        this.taxonChange.emit(null);
        this.selected = undefined;
        this.input.nativeElement.disabled = false;
        this.input.nativeElement.value = '';
    }

    keyEvent(e, item) {
        //Enter
        if (e.keyCode === 13) {
            this.onSelect(item)
        }
    }

    keyEventRemoveSelected(e) {
        //Enter
        if (e.keyCode === 13) {
            this.removeSelected();
        }
    }

    fillValue(val) {
        this.selected = val;
        this.autocompleteItems = undefined;
        if (val) {
            this.input.nativeElement.disabled = true;
            this.input.nativeElement.value = val;
        } else {
            this.input.nativeElement.disabled = false;
            this.input.nativeElement.value = '';
        }
        this.cdr.markForCheck();
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
