import { Component, Input } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { ObservationModalComponent } from "./observation-modal.component";

@Component({
    template: `
<div class="popup-link-row">
    <h5 translate>observation-map.popup.title</h5>
    <a (click)="openModal(observationId, unitId)" class="oi oi-eye"></a>
</div>
<hr>
<div class="popup-link-row">
    {{name.charAt(0).toUpperCase() + name.substr(1)}}
    <a [routerLink]="['./lajit/', taxonId]" class="oi oi-info"></a>
</div>
{{municipality}}<br>
{{date.substring(8, 10) + "." + date.substring(5, 7) + "." + date.substring(0, 4)}}<br>
{{reliability}}<br>
{{notes}}<br>
`
})
export class ObservationMapPopupComponent {
    @Input() name: string;
    @Input() municipality: string;
    @Input() date: string;
    @Input() reliability: string;
    @Input() notes: string;
    @Input() taxonId: string;
    @Input() observationId: string;
    @Input() unitId: string;
    @Input() modalRef: BsModalRef;

    constructor(private modalService: BsModalService) {}

    openModal(observationId, unitId) {
        this.modalRef = this.modalService.show(ObservationModalComponent, {initialState: {observationId, unitId}, class: 'modal-custom'});
    }
}
