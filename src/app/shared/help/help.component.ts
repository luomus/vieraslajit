import { Component, Renderer2, OnInit, ElementRef } from "@angular/core";

@Component({
    selector: 'vrs-help',
    template: `
        <span class="oi oi-question-mark help"></span>
        <vrs-help-popup *ngIf="activated" class="raised-5"><ng-content></ng-content></vrs-help-popup>
    `,
    styles: [`
        .help {
            font-size: 0.6em;
            font-weight: 700;
            margin-left: 0.2em;
            position: relative;
            top: -0.5em;
        }
    `]
})
export class HelpComponent implements OnInit{
    activated = false;

    constructor(private renderer: Renderer2, private el: ElementRef) {}

    ngOnInit() {
        this.renderer.listen(this.el.nativeElement, "mouseenter", (event) => {
            this.activated = true;
        });
        this.renderer.listen(this.el.nativeElement, "mouseleave", (event) => {
            this.activated = false;
        });
    }
}