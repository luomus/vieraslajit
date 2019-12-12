import { Component, Input } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap";
import { ObservationModalComponent } from "./observation-modal.component";

@Component({
    template: `
<table class="popup">
    <tr class="header-row">
        <td class="icon-container">
            <a (click)="openModal(observationId, unitId)" class="oi oi-eye"></a>
        </td>
        <td>
            <h5 translate>observation-map.popup.title</h5>
        </td>
    </tr>
    <tr>
        <td class="icon-container">
            <a [routerLink]="['./lajit/', taxonId]" class="oi oi-info"></a>
        </td>
        <td>
            {{name.charAt(0).toUpperCase() + name.substr(1)}}
        </td>
    </tr>
    <tr>
        <td></td>
        <td>
            {{municipality}}
        </td>
    </tr>
    <tr>
        <td></td>
        <td>
            {{date.substring(8, 10) + "." + date.substring(5, 7) + "." + date.substring(0, 4)}}
        </td>
    </tr>
    <tr>
        <td></td>
        <td>
            {{reliability}}
        </td>
    </tr>
    <tr>
        <td></td>
        <td>
            {{notes}}
        </td>
    </tr>
</table>
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
