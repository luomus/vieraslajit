import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'laji-spinner',
  template: `
  <div id="loader-wrapper"
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

  constructor() { }

  ngOnInit() {
  }

}
