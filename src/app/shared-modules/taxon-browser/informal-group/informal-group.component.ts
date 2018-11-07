import { Component, Input, Renderer2, ElementRef, OnInit, Output, EventEmitter } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
    selector: 'vrs-informal-group',
    template: `
        <div [ngClass]="{'activated': activeState}" class="informal-group raised-1">
            <img class="" src="assets/images/taxon-groups/{{groupId}}.svg">
            <span>{{name}}</span>
        </div>
    `,
    styleUrls: ['./informal-group.component.scss']
})
export class InformalGroupComponent implements OnInit {
    @Input() groupId: string = 'MVL.1';
    @Input() name: string = 'Linnut';

    @Output() selected: EventEmitter<object> = new EventEmitter<object>();

    activeState = false;

    constructor(private renderer: Renderer2, private ref: ElementRef) {}

    ngOnInit() {
        this.renderer.listen(this.ref.nativeElement, "click", () => {
            this.activeState = !this.activeState;
            this.selected.emit({activeState: this.activeState, group: this});
        });
    }

    getGroupId(): string {
        return this.groupId;
    }

    setActiveState(bool: boolean) {
        this.activeState = bool;
    }
}