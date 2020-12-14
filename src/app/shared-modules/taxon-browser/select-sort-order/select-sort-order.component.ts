import { Component, Output, Input, OnInit, Renderer2, EventEmitter, OnDestroy, ViewChild, ElementRef, destroyPlatform, ChangeDetectorRef } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { startWith, map } from "rxjs/operators";

export type SortOrder = 'observations' | 'taxonomic' | 'finnish_name' | 'scientific_name' | 'vernacularName.en' | 'vernacularName.sv'

@Component({
    selector: 'vrs-select-sort-order',
    templateUrl: './select-sort-order.component.html',
    styleUrls: ['./select-sort-order.component.scss']
})
export class SelectSortOrderComponent implements OnInit, OnDestroy {
    @ViewChild('title', { static:false }) titleRef: ElementRef;
    @ViewChild('dropdown', { static: false }) dropdownRef: ElementRef;
    sortOrders: SortOrder[] = ['observations', 'taxonomic', 'finnish_name', 'scientific_name'];
    menuOpen = false;
    @Input() current: SortOrder = 'observations';
    private sorted$ = new Subject<SortOrder>();
    @Output() sorted: Observable<SortOrder> = this.sorted$.asObservable();

    private destroy: Function;

    constructor(
        private renderer: Renderer2,
        private translate: TranslateService
    ) {}

    ngOnInit() {
        this.translate.onLangChange.pipe(
            startWith({lang: this.translate.currentLang}),
            map(event => event.lang)
        ).subscribe(lang => {
            switch (lang) {
                case 'fi':
                    this.sortOrders = ['observations', 'taxonomic', 'finnish_name', 'scientific_name']
                    break;
                case 'en':
                    this.sortOrders = ['observations', 'taxonomic', 'vernacularName.en', 'scientific_name']
                    break;
                case 'sv':
                    this.sortOrders = ['observations', 'taxonomic', 'vernacularName.sv', 'scientific_name']
                    break;
            }
        });

        this.destroy = this.renderer.listen(document, 'click', (ev) => {
            const target = ev.target;
            if (!(this.dropdownRef.nativeElement.contains(target) || this.titleRef.nativeElement.contains(target))) {
                this.menuOpen = false;
            }
        });
    }

    changeSortOrder(s: SortOrder) {
        this.current = s;
        this.sorted$.next(s);
        this.menuOpen = false;
    }

    ngOnDestroy() {
        this.sorted$.complete();
        if (this.destroy) this.destroy();
    }
}