import { Component, Output, Input, OnInit, Renderer2, EventEmitter, OnDestroy, ViewChild, ElementRef, destroyPlatform } from "@angular/core";
import { Observable, Subject } from "rxjs";

export type SortOrder = 'observations' | 'taxonomic' | 'finnish_name'

@Component({
    selector: 'vrs-select-sort-order',
    templateUrl: './select-sort-order.component.html',
    styleUrls: ['./select-sort-order.component.scss']
})
export class SelectSortOrderComponent implements OnInit, OnDestroy {
    @ViewChild('title', { static:false }) titleRef: ElementRef;
    @ViewChild('dropdown', { static: false }) dropdownRef: ElementRef;
    sortOrders: SortOrder[] = ['observations', 'taxonomic', 'finnish_name'];
    menuOpen = false;
    @Input() current: SortOrder = 'observations';
    private sorted$ = new Subject<SortOrder>();
    @Output() sorted: Observable<SortOrder> = this.sorted$.asObservable();

    private destroy: Function;

    constructor(private renderer: Renderer2) {}

    ngOnInit() {
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
    }

    ngOnDestroy() {
        this.sorted$.complete();
        if (this.destroy) this.destroy();
    }
}