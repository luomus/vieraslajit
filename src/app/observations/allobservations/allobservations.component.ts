import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { UserService} from '../../shared/service/user.service';
import { Subscription } from 'rxjs/Subscription';
import { Warehouse } from '../../shared/model/Warehouse';
import { ObservationService } from '../../shared/service/observation.service';
import { element } from 'protractor';


@Component({
  selector: 'vrs-allobservations',
  templateUrl: './allobservations.component.html',
  styleUrls: ['./allobservations.component.scss']
})
export class AllobservationsComponent implements OnInit {
  @Input() id: string;
  public loading = true;
  private subTrans: Subscription;
  private pageSize: string;
  allobservations:Array<any> = [];
  columns = [];
  personToken: string;
  loggedIn=false;

  constructor(private translate : TranslateService, private router : Router, private observationservice: ObservationService) { }

  ngOnInit() {
    this.loading=true;
    this.subTrans = this.translate.onLangChange.subscribe(this.update.bind(this));
    this.pageSize= "50";
    this.update();
  }
  update(){
    this.observationservice.getAllObservations(this.pageSize).subscribe(data =>{
      this.allobservations= data.results;
      console.log(this.allobservations);
    });
    this.columns = [
      { prop: 'taxonVerbatim', name:this.translate.instant('document.dayOfYearBegin') , draggable: false},
      { prop: 'scientificName', name:this.translate.instant('document.dayOfYearEdited') , draggable: false},
      { prop: 'municipality', name:this.translate.instant('document.location')},
      { prop: 'team', name:this.translate.instant('document.dayOfYearBegin') , draggable: false},
      { prop: 'municipalityDisplayname', name:this.translate.instant('document.dayOfYearEdited') , draggable: false},
      { prop: 'displayDateTime', name:this.translate.instant('document.location')}
    ];

  }
}
