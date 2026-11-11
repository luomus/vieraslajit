import { Component, Output, EventEmitter, OnDestroy, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy } from "@angular/core";
import { ApiService } from "app/shared/api/api.service";
import { AutocompleteResult } from "../../shared/model/Autocomplete";
import { TranslateService } from "@ngx-translate/core";
import { fromEvent, Subject } from "rxjs";
import { debounceTime, takeUntil, filter, map, switchMap } from "rxjs/operators";

@Component({
    selector: "vrs-taxon-search",
    templateUrl: './taxon-search.component.html',
    styleUrls: ["./taxon-search.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaxonSearchComponent implements AfterViewInit, OnDestroy {
    unsubscribe$ = new Subject<void>();

    autocompleteItems: AutocompleteResult[] | undefined;
    selected: AutocompleteResult | string | undefined;

    @ViewChild('autocomplete', { static: false }) autocomplete!: ElementRef<HTMLElement>;
    @ViewChild('input', { static: false }) input!: ElementRef<HTMLInputElement>;
    @Output() taxonChange = new EventEmitter<string | null | undefined>();

    constructor(
        private apiService: ApiService,
        private cdr: ChangeDetectorRef,
        public translate: TranslateService
    ) {}

    ngAfterViewInit() {
        fromEvent<Event>(this.input.nativeElement, 'input').pipe(
            takeUntil(this.unsubscribe$),
            debounceTime(500)
        ).pipe(
            filter((event: Event) => {
                if ((event.target as HTMLInputElement).value.length < 3) {
                    this.autocompleteItems = undefined;
                    this.cdr.markForCheck();
                    return false;
                } else {
                    return true
                }
            }),
            map(event => (event.target as HTMLInputElement).value),
            switchMap(val => this.apiService.getAutocompleteTaxa({ query: val, invasiveSpecies: true }))
        ).subscribe(r => {
            this.autocompleteItems = r.results;
            this.cdr.markForCheck();
        });

        fromEvent<MouseEvent>(document, 'click').pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(event => {
            if (!this.autocomplete.nativeElement.contains(event.target as Node)) {
                this.autocompleteItems = undefined;
                this.cdr.markForCheck();
            }
        })
    }

    onSelect(item: AutocompleteResult) {
        this.taxonChange.emit(item.key);
        this.selected = item;
        this.autocompleteItems = undefined;
        this.input.nativeElement.disabled = true;
        this.input.nativeElement.value = item.value ?? '';
    }

    removeSelected() {
        this.taxonChange.emit(null);
        this.selected = undefined;
        this.input.nativeElement.disabled = false;
        this.input.nativeElement.value = '';
    }

    keyEvent(e: KeyboardEvent, item: AutocompleteResult) {
        //Enter
        if (e.keyCode === 13) {
            this.onSelect(item)
        }
    }

    keyEventRemoveSelected(e: KeyboardEvent) {
        //Enter
        if (e.keyCode === 13) {
            this.removeSelected();
        }
    }

    fillValue(val: string | undefined) {
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
