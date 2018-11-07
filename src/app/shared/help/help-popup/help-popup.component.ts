import { Component } from "@angular/core";

@Component({
    selector: "vrs-help-popup",
    template: `<ng-content></ng-content>`,
    styleUrls: ["./help-popup.component.scss"]
})
export class HelpPopupComponent {
    constructor(){}
}