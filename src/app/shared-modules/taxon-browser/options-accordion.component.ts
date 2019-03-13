import { Component, Input } from "@angular/core";

@Component({
    selector: 'options-accordion',
    template: `
<div class="options-title" (click)="onClick($event)">{{title}}<div class="options-title-icon-container"><span class="oi" [ngClass]="{'oi-chevron-right': !active, 'oi-chevron-bottom': active}"></span></div></div>
<div class="options-content" [ngClass]="{'hide': !active}">
    <ng-content></ng-content>
</div>
    `,
    styleUrls: [`options-accordion.component.scss`]
})
export class OptionsAccordionComponent {
    @Input() title;
    active = true;
    constructor(){}
    onClick(e) {
        this.active = !this.active;
    }
}