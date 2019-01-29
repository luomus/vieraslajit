import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { InformationService } from '../shared/service/information.service';
import { Router } from '@angular/router';
import { parseWP } from '../shared/pipe/parse-wp.pipe';

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
  loading = true;

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
    this.loading = true;
    this.informationService.getInformation(id).subscribe((data) => {
      this.scontent = data;
      this.scontent["content"] = parseWP(this.scontent["content"]);
      this.scontent["directParent"] = data.parents[data.parents.length - 1];
      this.child_pages = data.children;
      if(data.children) {
        for(let c of this.child_pages) {
          this.informationService.getInformation(c.id).subscribe((data) => {
            c.data = data;
            this.loading=false;
          });
        }
      } else {
        this.loading = false;
      }
    });
  }
}
