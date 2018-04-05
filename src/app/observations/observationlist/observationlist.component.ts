import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { UserService} from '../../shared/service/user.service';
import { TaxonService} from '../../shared/service/taxon.service'
import { Subscription } from 'rxjs/Subscription';
import { WarehouseQueryList } from '../../shared/model/Warehouse';
import { PagedResult } from '../../shared/model/PagedResult';
import { ObservationService } from '../../shared/service/observation.service';
import { Taxonomy } from '../../shared/model/Taxonomy';
import { element } from 'protractor';

@Component({
  selector: 'vrs-observationlist',
  templateUrl: './observationlist.component.html',
  styleUrls: ['./observationlist.component.scss'],
  encapsulation: ViewEncapsulation.None
  
})
export class ObservationlistComponent implements OnInit {
  @Input() id: string;
  private subTrans: Subscription;
  private pageSize: string;
  private idArray: Array<string> = [];
  observations: Array<WarehouseQueryList> = [];
  columns = [];
  taxon: Taxonomy;
  documentId: string;
  constructor(private translate: TranslateService, private router: Router, private observationService: ObservationService,private userService: UserService, private taxonService: TaxonService) { }

  ngOnInit() {
    this.subTrans = this.translate.onLangChange.subscribe(this.update.bind(this));
    this.idArray.push(this.id);
    this.pageSize= "20";
    this.update();
  }

  update(){
    
    this.columns = [
      { prop: 'vernacularName', name: this.translate.instant('taxonomy.folkname'), canAutoResize: true, draggable: false, resizeable: false, minWidth: 150 },
      { prop: 'scientificName', name: this.translate.instant('taxonomy.scientificname'), canAutoResize: true, draggable: false, resizeable: false, minWidth: 150 },
      { prop: 'dayOfYearBegin', name:this.translate.instant('warehouseQueryList.dayOfYearBegin') , draggable: false, canAutoResize: false, headerClass: 'mobile-hidden', cellClass: 'mobile-hidden', resizeable: false },
      { prop: 'dayOfYearEnd', name:this.translate.instant('warehouseQueryList.dayOfYearEnd') , draggable: false, canAutoResize: false, headerClass: 'mobile-hidden', cellClass: 'mobile-hidden', resizeable: false },
      { prop: 'reliableString', name: this.translate.instant('warehousequeryList.reliable'), draggable: false, canAutoResize: false, headerClass: 'mobile-hidden', cellClass: 'mobile-hidden', resizeable: false }
    ];  
  }

  getTaxon(){
    this.taxonService.getTaxon(this.id, this.translate.currentLang).subscribe(data => {
      this.taxon = data;
    });
  }


  getList(){
    this.observationService.getObservationsById(this.idArray, this.pageSize).subscribe(data => {
      this.observations= data.results;
    });  
  }

  onSelect(event) {
    this.router.navigate(['/taxon', event.selected.shift().id]);
  }

}
