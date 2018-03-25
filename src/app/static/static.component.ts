import { Component, OnInit } from '@angular/core';
import { InformationService } from '../shared/service/information.service';
import { Information } from '../shared/model/Information';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * Renders static page ie. /static/:id route
 * 
 * StaticComponent is dynamically populated from the CMS. The CMS is
 * accessed via laji API using InformationService
 * 
 */

@Component({
  selector: 'vrs-static',
  templateUrl: './static.component.html',
  styleUrls: ['./static.component.scss'],
})
export class StaticComponent implements OnInit {

  public scontent: Object;
  id: String;

  constructor(public informationService: InformationService, private route: ActivatedRoute, private router: Router) { }

  /**
   * Captures 'id' from url route and passes it to getInformation(id)
   */

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getInformation("i-"+ this.id);
    // update scontent   
  }

  /**
   * Updates scontent with data from the CMS
   * @param{string} id  id of the content that will be loaded into scontent
   */

  getInformation(id) {
    this.informationService.getInformation(id).subscribe((data) => {
        this.scontent = data;
    });
  }
}
