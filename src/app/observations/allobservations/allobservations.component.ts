import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { UserService} from '../../shared/service/user.service';
import { Subscription } from 'rxjs/Subscription';
import { Warehouse, WarehouseQueryList } from '../../shared/model/Warehouse';
import { ObservationService } from '../../shared/service/observation.service';
import { element } from 'protractor';
import { PagedResult } from '../../shared/model/PagedResult';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import * as $ from 'jquery';



@Component({
  selector: 'vrs-allobservations',
  templateUrl: './allobservations.component.html',
  styleUrls: ['./allobservations.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AllobservationsComponent implements OnInit {
  @Input() id: string;
  public loading = true;
  private subTrans: Subscription;
  private pageSize: string;
  page:PagedResult<WarehouseQueryList>;
  observations:Array<any> = [];
  columns = [];
  personToken: string;
  currentPage = 1;
  pageData = [];
  maxSize = 5;
  itemsPerPage = 20;
 


  constructor(private translate : TranslateService, private router : Router, private observationservice: ObservationService) { }

  ngOnInit() {
    this.loading=true;
    this.subTrans =this.translate.onLangChange.subscribe(this.update.bind(this));
    this.pageSize= "1000";
    this.update();
  }
  update(){
    this.columns = [
      { prop: 'taxonVerbatim', name:this.translate.instant('taxon.name') , draggable: false},
      { prop: 'scientificName', name:this.translate.instant('taxon.scientific') , draggable: false},
      { prop: 'team', name:this.translate.instant('taxon.scientific') , draggable: false},
      { prop: 'municipalityDisplayname', name:this.translate.instant('document.location') , draggable: false},
      { prop: 'displayDateTime', name:this.translate.instant('observation.datetime')}
    ];
    this.getObservations();
    
    
  }

  getObservations(pageNumber: string = '1'){
    this.observationservice.getAllObservations(this.pageSize,pageNumber).subscribe(data =>{
      this.page = data;
      this.observations= data.results;
      this.observations.forEach(observationObject=>{
        observationObject.taxonVerbatim = observationObject.unit.taxonVerbatim;
        observationObject.team = observationObject.gathering.team;
        observationObject.scientificName = observationObject.unit.linkings.taxon.scientificName;
        observationObject.municipalityDisplayname = observationObject.gathering.interpretations.municipalityDisplayname;
        observationObject.displayDateTime = observationObject.gathering.displayDateTime;
       });
      this.pageData = this.observations.slice(0,20);
      },() => null, () => this.loader());
    
  }
  loader() {
    if (this.loading) {
      this.loading = false;
    }
  }
  setPage(event) {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  pageChanged(event): void {
    let startItem = (event.page - 1) * event.itemsPerPage;
    let endItem = event.page * event.itemsPerPage;
    this.pageData = this.observations.slice(startItem, endItem);
    this.onPageChange();
  }
  onPageChange() {
    $('html, body').animate({ scrollTop: 0 }, 0);
  }


}
