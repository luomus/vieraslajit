import { Component, Input } from "@angular/core";

@Component({
    selector: 'options-accordion',
    template: `
<div class="options-header" (click)="onClick($event)">{{header}}<div class="options-header-icon-container"><span class="oi" [ngClass]="{'oi-chevron-right': !active, 'oi-chevron-bottom': active}"></span></div></div>
<div class="options-content" [ngClass]="{'hide': !active}">
    <ng-content></ng-content>
</div>
    `,
    styleUrls: [`options-accordion.component.scss`]
})
export class OptionsAccordionComponent {
    @Input() header;
    active = true;
    constructor(){}
    onClick(e) {
        this.active = !this.active;
    }
}