import { Component, Renderer2, ChangeDetectorRef, ElementRef, ViewChild, Output, EventEmitter, Input, AfterViewInit } from "@angular/core";
import { isDescendant } from "../../../utils";

@Component({
    selector: 'vrs-group-dropdown',
    templateUrl: 'group-dropdown.component.html',
    styleUrls: ['group-dropdown.component.scss']
})
export class GroupDropdownComponent implements AfterViewInit {
    open = false;
    selected_groups: Set<string> = new Set([])

    @Input() groups: string[];
    @Output() selected = new EventEmitter()
    @ViewChild('elemwrapper') elementRef: ElementRef
    constructor(private renderer: Renderer2, private changeDetector: ChangeDetectorRef) {}
    ngAfterViewInit() {
        this.renderer.listen(window, 'click', (e) => {
        if (isDescendant(this.elementRef.nativeElement, e.target)) {

        } else {
            this.open = false;
            this.changeDetector.markForCheck();
        }
        });
    }

    checked(group) {
        return this.selected_groups.has(group);
    }

    onChecked(e) {
        if (e.target.checked) {
            this.selected_groups.add(e.target.id);
        } else {
            this.selected_groups.delete(e.target.id);
        }
        this.selected.emit(this.selected_groups);
    }
}