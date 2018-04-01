import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'vrs-observationlist',
  templateUrl: './observationlist.component.html',
  styleUrls: ['./observationlist.component.scss'],
  encapsulation: ViewEncapsulation.None
  
})
export class ObservationlistComponent implements OnInit {

  private subTrans: Subscription;
  columns = [];

  constructor(private translate: TranslateService) { }

  ngOnInit() {
    this.update();
  }

  update(){
    this.columns = [
      { name:'Eka', canAutoResize: false, draggable: false, resizeable: false },
      { name:'Toka',canAutoResize: false, draggable: false, resizeable: false, width: 150 },
      { name:'Kolmas', draggable: false, canAutoResize: false, headerClass: 'mobile-hidden', cellClass: 'mobile-hidden', resizeable: false }
    ];
  }

}
