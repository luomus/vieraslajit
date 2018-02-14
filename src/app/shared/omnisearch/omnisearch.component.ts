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
    import 'rxjs/add/operator/do';
    import 'rxjs/add/operator/debounceTime';
    import 'rxjs/add/operator/combineLatest';
    import 'rxjs/add/observable/of';
    
    

@Component({
  selector: 'vrs-omnisearch',
  templateUrl: './omnisearch.component.html',
  styleUrls: ['./omnisearch.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class OmnisearchComponent implements OnInit, OnChanges, OnDestroy {

  @Input() placeholder: string;
  @Input() limit:10;
  @Input() selectTo ='/taxon';
  @Input() minLength = 3;
  @Input() visible=true;
  @Input() expand = '';
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



  constructor(
    
    private changeDetector:ChangeDetectorRef,
    private apiService:ApiService,
    private taxonservice:TaxonService,
    viewContainerRef:ViewContainerRef
  ) {
    this.el = viewContainerRef.element.nativeElement;
   }

   ngOnInit() {
     console.log('Init')
    this.inputChange = this.searchControl.valueChanges
      .do(value => this.search = value)
      .subscribe(value => {
        console.log('Update')
        this.updateTaxa();
        
      });
  
  }
  ngOnChanges(){
    this.updateTaxa();
    console.log('Change');

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
      console.log('activate');
      this.active =index;
      this.taxon = this.taxa[index];
      this.taxon.informalGroupsClass = this.taxon.payload.informalGroups.reduce((p,c) =>p+''+c.id,'');
      this.taxon.informalGroups = this.taxon.payload.informalGroups.map(group=>group.name).reverse();
      this.subCnt=Observable.of(this.taxon.key).combineLatest(
        this.taxonservice.getWareHouseQueryCount('count','fi',this.taxon.key),
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
    // up key
    if(e.keyCode ===38){
      if(this.taxa[this.active -1]){
        this.activate(this.active-1);
      }
    }
    //down key
    if(e.keyCode ===40){
      if(this.taxa[this.active +1]){
        this.activate(this.active+1);
      }
    }
    //Enter
    if(e.keyCode ===13){
      if(this.taxa[this.active]){
       // this.router.navigate(this.localizeRouterService.translateRoute([this.selectTo, this.taxa[this.active].key]));
        this.close();
      }
    }

  }

  private updateTaxa(){

    if (this.search.length < this.minLength) {
      this.loading = false;
      this.changeDetector.markForCheck();
      return;
    }

    this.loading =true;
    this.subTaxa = this.taxonservice.getAutocomplete('taxon',this.search).subscribe(
      
      data =>{
        this.taxa=data;
        this.loading=false;
        console.log('Autocomplete');
        this.activate(0);
        this.changeDetector.markForCheck()
      }
    );
   


  }

}
