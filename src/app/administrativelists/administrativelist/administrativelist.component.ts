import { Component, Input } from "../../../../node_modules/@angular/core";

export type listType = 'eu' | 'fi';

@Component({
    selector: 'vrs-administrativelist'
})
export class AdministrativelistComponent {
    @Input() type:listType;
    
    constructor() {}
}