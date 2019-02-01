import { Component, ChangeDetectionStrategy } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
    selector: 'vrs-observation-modal',
    template: `
  <div class="modal-header">
    <h4 class="modal-title pull-left">Hello</h4>
    <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <iframe [src]="iframeUrl()"></iframe>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-default" (click)="bsModalRef.hide()">Close</button>
  </div>
`,
    styles: [`
iframe {
    width: 75vw;
    height: 65vh;
}
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObservationModalComponent {
    id = ''
    constructor(public bsModalRef: BsModalRef, private sanitizer: DomSanitizer) {}
    iframeUrl() {
        return this.sanitizer.bypassSecurityTrustResourceUrl(`https://embedded.laji.fi/view?uri=${this.id}`)
    }
}