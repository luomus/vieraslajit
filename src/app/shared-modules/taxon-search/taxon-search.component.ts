import { Component, OnInit, Renderer2, Inject, PLATFORM_ID, Output, EventEmitter, OnDestroy, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import * as $ from 'jquery';
import { TranslateService } from "@ngx-translate/core";
import { isPlatformBrowser } from "@angular/common";
import { TaxonService } from "app/shared/service/taxon.service";
import { Taxonomy } from "app/shared/model";
import { fromEvent, Subject } from "rxjs";
import { debounceTime, takeUntil } from "rxjs/operators";

@Component({
    selector: "vrs-taxon-search",
    templateUrl: './taxon-search.component.html',
    styleUrls: ["./taxon-search.component.scss"]
})
export class TaxonSearchComponent implements AfterViewInit, OnDestroy {
    unsubscribe$ = new Subject<void>();

    autocompleteItems: [];
    selected;
    
    @ViewChild('autocomplete', { static: false }) autocomplete: ElementRef;
    @ViewChild('input', { static: false }) input: ElementRef;
    @Output() taxonChange = new EventEmitter();

    constructor(private taxonService: TaxonService,
                public translate: TranslateService,
                private renderer: Renderer2,
                @Inject(PLATFORM_ID) private platformId) {}

    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            fromEvent(this.input.nativeElement, 'input').pipe(
                takeUntil(this.unsubscribe$),
                debounceTime(500)
            ).subscribe(this.onSearchAreaInput.bind(this))
            fromEvent(document, 'click').pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe(event => {
                if (!this.autocomplete.nativeElement.contains(event.target)) {
                    this.autocompleteItems = undefined;
                }
            })
        }
    }

    onSearchAreaInput(event) {
        const val: string = event.target.value;
        if (val.length < 3) {
            this.autocompleteItems = undefined;
            return;
        }
        this.taxonService.getAutocomplete('taxon', val, this.translate.currentLang).subscribe(r => {
            this.autocompleteItems = r;
            console.log(r)
        });
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
            this.selected = item;
            this.input.nativeElement.disabled = true;
            this.input.nativeElement.value = item.value;
            this.autocompleteItems = undefined;
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
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
