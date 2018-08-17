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
  private subTrans: Subscription;
  child_pages: Array<any>;

  constructor(public informationService: InformationService, 
    private router: Router, private translate: TranslateService) { }

  /**
   * Captures 'id' from url route and passes it to getInformation(id)
   */ 

  ngOnInit() {
    this.subTrans = this.translate.onLangChange.subscribe(this.loadHomePage.bind(this));
  }

  ngOnChanges() {
    this.getInformation(this.id);
  }
  
  loadHomePage(){
      this.router.navigate(['./home']);
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

  ngOnDestroy() {
    this.subTrans.unsubscribe();
  }
}
