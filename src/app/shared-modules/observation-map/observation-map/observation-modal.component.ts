import { Component, ChangeDetectionStrategy } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap";
import { DomSanitizer } from "@angular/platform-browser";
import { environment } from "environments/environment";

@Component({
    selector: 'vrs-observation-modal',
    template: `
  <div class="modal-header">
    <h4 class="modal-title pull-left" translate>observations.modal.title</h4>
    <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <iframe [title]="'observations.modal.iframe' | translate" [src]="iframeUrl()"></iframe>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-default" (click)="bsModalRef.hide()" translate>observations.modal.close</button>
  </div>
`,
    styleUrls: ['./observation-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObservationModalComponent {
    observationId = '';
    unitId = '';
    constructor(public bsModalRef: BsModalRef, private sanitizer: DomSanitizer) {}
    iframeUrl() {
        return this.sanitizer.bypassSecurityTrustResourceUrl(environment.embedUrl + `/view?uri=${this.observationId}&highlight=${encodeURIComponent(this.unitId)}`)
    }
}
