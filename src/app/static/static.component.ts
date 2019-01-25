import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { InformationService } from '../shared/service/information.service';
import { Router } from '@angular/router';

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
        this.scontent["content"] = this.parseWP(this.scontent["content"]);
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

  parseWP(data:string): string{
    // Replace captions with <figcaption>
    // with linked image
    const regexLink = /\[caption[^\]]*\](<a.+?<\/a>)(.+?(?=\[\/caption\]))\[\/caption\]/mg;
    // just the image
    const regexImg = /\[caption[^\]]*\](<img.+?(?=\/>)\/>)(.+?(?=\[\/caption\]))\[\/caption\]/mg;
    let output = data.replace(regexLink, '<figure>$1<figcaption>$2</figcaption></figure>');
    output = output.replace(regexImg, '<figure>$1<figcaption>$2</figcaption></figure>');
    return output
  }

}
