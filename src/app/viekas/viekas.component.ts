import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { findContentID, StaticContent } from '../../assets/i18n/cms-content';

@Component({
  selector: 'vrs-viekas',
  templateUrl: './viekas.component.html',
  styleUrls: ['./viekas.component.scss']
})
export class ViekasComponent implements OnInit {
  rootId = '';
  cmsData = {title: '', children: []};
  id = '';

  constructor(private route: ActivatedRoute, private translate: TranslateService) { }

  ngOnInit() {
    this.rootId = findContentID(StaticContent.Viekas, this.translate.currentLang);
    this.route.data.pipe(map(data=>data.data)).subscribe(res=>{
      this.cmsData = res;
    });
    this.route.params.pipe(
      map(params => params['id'])
    ).subscribe(id => this.id = id);
  }

}
