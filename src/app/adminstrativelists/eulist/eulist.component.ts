import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Taxonomy } from '../../shared/model/Taxonomy';
import { ListService } from '../../shared/service/list.service';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'vrs-eulist',
  templateUrl: './eulist.component.html',
  styleUrls: ['./eulist.component.scss']
})
export class EulistComponent implements OnInit {
  private subTrans: Subscription;
  eulist: Taxonomy[];
  columns = [];

  constructor( private listService: ListService, private translate: TranslateService, private router:Router) { }


    ngOnInit() {
    this.subTrans = this.translate.onLangChange.subscribe(this.update.bind(this));
    this.update();
  }

  update() {
    this.columns = [
      { prop: 'vernacularName', name: this.translate.instant('taxonomy.folkname'), canAutoResize: false, draggable: false, resizeable: false },
      { prop: 'scientificName', name: this.translate.instant('taxonomy.scientificname'), canAutoResize: false, draggable: false, resizeable: false, width: 150 },
      { prop: 'stableString', name: this.translate.instant('taxonomy.established'), draggable: false, canAutoResize: false, headerClass: 'mobile-hidden', cellClass: 'mobile-hidden', resizeable: false }
    ];
    this.listService.getEuList('MX.37600', this.translate.currentLang).subscribe(data => {
      this.eulist = data.results;
      this.eulist.forEach(element => {
        element.stableString = this.translate.instant(String(element.stableInFinland));
      
      });
    });
  }

  ngOnDestroy() {
    this.subTrans.unsubscribe();
  } 

}


