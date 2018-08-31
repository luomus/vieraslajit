import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WarehouseQueryList } from '../shared/model/Warehouse';
import { PagedResult } from '../shared/model/PagedResult';

@Component({
  selector: 'vrs-observations',
  templateUrl: './observations.component.html',
  styleUrls: ['./observations.component.scss']
})
export class ObservationsComponent implements OnInit {
  page: PagedResult<WarehouseQueryList>;
  ownMode=false;
  id:string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params=>{
      if(params['mode'] == "user") this.ownMode = true;
      if(params['id']) this.id = params['id'];
    })
  }

}
