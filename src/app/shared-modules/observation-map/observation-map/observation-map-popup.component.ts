import { Component, Input } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { ObservationModalComponent } from "./observation-modal.component";

@Component({
    template: `
<div class="popup">
<h5 translate>observation-map.popup.title</h5>
<hr>
<div>{{name.charAt(0).toUpperCase() + name.substr(1)}}</div>
<div>{{municipality}}</div>
<div>{{date.substring(8, 10) + "." + date.substring(5, 7) + "." + date.substring(0, 4)}}</div>
<div>{{reliability}}</div>
<div>{{notes}}</div>
<hr>
<a (click)="openModal(observationId, unitId)" class="popup-link"><span class="oi oi-eye"></span>Tarkastele havaintoa</a>
<a [routerLink]="['./lajit/', taxonId]" class="popup-link"><span class="oi oi-info"></span>Lue lisää lajista</a>
</div>
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
