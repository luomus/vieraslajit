import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { TaxonListComponent } from './taxon-list.component';
import { TaxonService } from '../../shared/service/taxon.service';
import { ApiService } from '../../shared/api/api.service';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';
import { AccordionModule, TabsModule, PaginationModule } from 'ngx-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TaxonServiceMock } from '../../../testing/taxon/TaxonServiceMock';
import { TaxonBrowserModule } from '../../shared-modules/taxon-browser/taxon-browser.module';

describe('TaxonListComponent', () => {
  let component: TaxonListComponent;
  let fixture: ComponentFixture<TaxonListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaxonListComponent],
      imports: [
        FormsModule, RouterTestingModule, HttpClientModule, SharedModule, TranslateModule.forRoot(), AccordionModule.forRoot(), TabsModule.forRoot(),
        NgxDatatableModule, PaginationModule, TaxonBrowserModule
      ],
      providers: [{provide: TaxonService, useClass: TaxonServiceMock}, ApiService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  })

  it('should show group species when group is selected', () => {
    expect(component.selectedGroup).toBeUndefined();
    component.onGroupSelect({id: 'MVL.1'}, '1');
    expect(component.selectedGroup.id).toEqual('MVL.1');
    
  })


});
