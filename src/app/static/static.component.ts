import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { InformationService } from '../shared/service/information.service';
import { Information } from '../shared/model/Information';
import { ActivatedRoute, Router, NavigationEnd, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { filter } from '../../../node_modules/rxjs/operators';

/**
 * Renders content from CMS.
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
export class StaticComponent implements OnInit, OnChanges {

  public scontent: Object;
  @Input() id: string;
  child_pages: Array<any>;

  constructor(public informationService: InformationService, 
    private router: Router) { }

  ngOnInit() {

  }

  ngOnChanges() {
    this.getInformation(this.id);
  }

  /**
   * Updates scontent with data from the CMS
   * @param{string} id  id of the content that will be loaded into scontent
   */

  getInformation(id) {
    this.informationService.getInformation(id).subscribe((data) => {
        this.scontent = data;
        this.child_pages = data.children;
        if(data.children) {
          for(let c of this.child_pages) {
            this.informationService.getInformation(c.id).subscribe((data) => {
              c.data = data;
            });
          }
        }
    });
  }

}
