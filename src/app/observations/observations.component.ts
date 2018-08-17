import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { UserService } from '../shared/service/user.service';
import { Subscription } from 'rxjs';
import { Warehouse, WarehouseQueryList } from '../shared/model/Warehouse';
import { ObservationService } from '../shared/service/observation.service';
import { element } from 'protractor';
import { PagedResult } from '../shared/model/PagedResult';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import * as $ from 'jquery';



@Component({
  selector: 'vrs-observations',
  templateUrl: './observations.component.html',
  styleUrls: ['./observations.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ObservationsComponent implements OnInit {
  @Input() id: string;
  page: PagedResult<WarehouseQueryList>;
  ownMode=false;

  constructor(private translate: TranslateService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      if(params['mode'] == "user") this.ownMode = true;
    })
  }

}
