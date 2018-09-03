import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WarehouseQueryList } from '../shared/model/Warehouse';
import { PagedResult } from '../shared/model/PagedResult';

@Component({
  selector: 'vrs-observations',
  templateUrl: './observations.component.html',
  styleUrls: ['./observations.component.scss']
})
export class ObservationsComponent implements OnInit, OnDestroy {
  page: PagedResult<WarehouseQueryList>;
  ownMode=false;
  id:string;
  queryParams: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.queryParams = this.route.queryParams.subscribe((params)=>{
      if(params['user'] == true) this.ownMode = true;
      if(params['id']) this.id = params['id'];
    });
  }

  ngOnDestroy() {
    this.queryParams.unsubscribe();
  }
}
