import {
   ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    EventEmitter,
    HostListener,
    Input,
    Output,
    ViewContainerRef,
    OnChanges,
    OnDestroy } from '@angular/core';
    import { Autocomplete } from '../../shared/model/Autocomplete';
    import { WarehouseQueryCount } from '../../shared/model/Warehouse'
    import{Subscription} from 'rxjs/Subscription'
    import{Observable} from 'rxjs/Observable'
    import{FormControl} from'@angular/forms'
    import { TaxonService } from '../../shared/service/taxon.service'
    import { ApiService } from '../../shared/api/api.service';
    import{Router} from '@angular/router'
    import{LocalizeRouterService} from '../../locale/localize-router.service'
    import 'rxjs/add/operator/do';
    import 'rxjs/add/operator/debounceTime';
    import 'rxjs/add/operator/combineLatest';
    ;
    

@Component({
  selector: 'vrs-omnisearch',
  templateUrl: './omnisearch.component.html',
  styleUrls: ['./omnisearch.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class OmnisearchComponent implements OnInit, OnChanges, OnDestroy {

  @Input() placeholder: string;
  @Input() limit:10;
  @Input() delay: 200;
  @Input() selectTo ='/taxon';
  @Input() minLength ='3';
  @Input() visible=true;
  @Output() visibleTaxon = new EventEmitter<any>();
  public search='';
  public searchControl = new FormControl();
  public active = 0;
  public taxa = [];
  public taxon: any;
  public loading = false;
  private subTaxa: Subscription;
  private subCnt:Subscription;
  private inputChange:Subscription;
  private el: Element;
  public lang: 'fi';



  constructor(
    private router:Router,
    private changeDetector:ChangeDetectorRef,
    private apiService:ApiService,
    private taxonservice:TaxonService,
    private localizeRouterService:LocalizeRouterService,
    viewContainerRef:ViewContainerRef
  ) {
    this.el = viewContainerRef.element.nativeElement;
   }

  ngOnInit() {
    this.inputChange = this.searchControl.valueChanges
    .do(value => this.search = value).debounceTime(this.delay)
    .subscribe(value =>{
      this.updateTaxa();
    });
  }
  ngOnChanges(){
    this.updateTaxa();

  }
  ngOnDestroy(){
    if(this.inputChange){
      this.inputChange.unsubscribe();
    }

  }
  close(){
    this.search = '';
    this.taxa=[];
  }
  activate(index: number):void{
    if(this.taxa[index]){
      this.active =index;
      this.taxon = this.taxa[index];
      this.taxon.informalGroupsClass = this.taxon.payload.informalGroups.reduce((p,c) =>p+''+c.id,'');
      this.taxon.informalGroups = this.taxon.payload.informalGroups.map(group=>group.name).reverse();
      this.subCnt=Observable.of(this.taxon.key).combineLatest(
        this.taxonservice.getWareHouseQueryCount({taxonId: this.taxon.key}),
        (id, cnt) =>{
          return{id:id, cnt: cnt};
        }).subscribe(data => {
          this.taxa.map(auto=>{
          if(auto.key === data.id){
            auto['count'] =data.cnt;
          }
          });
          this.visibleTaxon.emit(this.taxa[index]);
          this.changeDetector.markForCheck();
        });
      
    }else{
      this.taxon = undefined;
    }

  }

  keyEvent(e){
    //key up
    if(e.keyCode ===38){
      if(this.taxa[this.active -1]){
        this.activate(this.active-1);
      }
    }
    //key down
    if(e.keyCode ===40){
      if(this.taxa[this.active +1]){
        this.activate(this.active+1);
      }
    }
    //Enter
    if(e.keyCode ===13){
      if(this.taxa[this.active]){
        this.router.navigate(this.localizeRouterService.translateRoute([this.selectTo, this.taxa[this.active].key]));
        this.close();
      }
    }

  }

  private updateTaxa(){
    if (this.subTaxa){
      this.subTaxa.unsubscribe();
    }
    if(this.subCnt){
      this.subCnt.unsubscribe();
    }

    this.loading =true;
    this.subTaxa = this.taxonservice.getAutocomplete({field:this.taxon, q:this.search,
      limit:''+this.limit}).subscribe(
      data =>{
        this.taxa=data;
        this.loading=false;
        this.activate(0);
        this.changeDetector.markForCheck()
      }
    );
   


  }

}
