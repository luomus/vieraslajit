import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { WarehouseQueryList } from '../shared/model/Warehouse';
import { PagedResult } from '../shared/model/PagedResult';

@Component({
  selector: 'vrs-observations',
  templateUrl: './observations.component.html',
  styleUrls: ['./observations.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ObservationsComponent implements OnInit {
  page: PagedResult<WarehouseQueryList>;
  ownMode=false;
  id:string;

  constructor(private translate: TranslateService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      if(params['mode'] == "user") this.ownMode = true;
      if(params['id']) this.id = params['id'];
    })
  }

}
