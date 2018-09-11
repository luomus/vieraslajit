import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WarehouseQueryList } from '../shared/model/Warehouse';
import { PagedResult } from '../shared/model/PagedResult';
import { Subscription } from 'rxjs';

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

  mapHeight = 800;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.queryParams = this.route.queryParams.subscribe((params)=>{
      if(params['user'] == true) this.ownMode = true;
      if(params['id']) this.id = params['id'];
    });

    let height = window.innerHeight - ((window.innerHeight / 100)*30);
    if (height < this.mapHeight) {
      this.mapHeight = height;
    }
  }

  ngOnDestroy() {
    this.queryParams.unsubscribe();
  }
}
