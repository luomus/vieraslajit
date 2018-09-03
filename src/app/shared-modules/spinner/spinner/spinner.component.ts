import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'laji-spinner',
  template: `
  <div [ngClass]="{'loader-wrapper': fullViewport}"
  *ngIf="spinning"
  [ngClass]="{'overlay-spinner': overlay, 'light': light}">
  <div id="loader"></div>
</div>
<ng-content *ngIf="!hideContentWhileLoading || !spinning"></ng-content>`,
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  @Input() spinning = true;
  @Input() overlay = false;
  @Input() light = false;
  @Input() hideContentWhileLoading = false;
  @Input() fullViewport = true;

  constructor() { }

  ngOnInit() {
  }

}
