import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ObservationService } from '../shared/service/observation.service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { ApiService } from '../shared/api/api.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterTestingModule } from '@angular/router/testing';
import { TabsModule } from 'ngx-bootstrap';
import { DatePipe } from '@angular/common';
import { AlertModule } from 'ngx-bootstrap';
import { AreaService } from '../shared/service/area.service';
import { TaxonService } from '../shared/service/taxon.service';

import { ObservationsComponent } from './observations.component';
import { UserService } from '../shared/service/user.service';
import { StateService } from '../state.service';

describe('AllobservationsComponent', () => {
  let component: ObservationsComponent;
  let fixture: ComponentFixture<ObservationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservationsComponent ],
      imports: [HttpClientModule, SharedModule, TranslateModule.forRoot(), NgxDatatableModule, RouterTestingModule,TabsModule.forRoot(),AlertModule],
      providers: [ObservationService, ApiService, UserService,DatePipe, AreaService, TaxonService, StateService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
