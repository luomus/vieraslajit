import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ObservationService } from '../../shared/service/observation.service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { ApiService } from '../../shared/api/api.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RouterTestingModule } from '@angular/router/testing';
import { TabsModule } from 'ngx-bootstrap';
import {ObservationmapComponent} from '../observationmap/observationmap.component'
import {ObservationlistComponent} from '../observationlist/observationlist.component'
import { DatePipe } from '@angular/common';
import { AlertModule } from 'ngx-bootstrap';
import { AlertService } from '../../shared/service/alert.service';


import { AllobservationsComponent } from './allobservations.component';
import { UserService } from '../../shared/service/user.service';

describe('AllobservationsComponent', () => {
  let component: AllobservationsComponent;
  let fixture: ComponentFixture<AllobservationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllobservationsComponent,ObservationmapComponent, ObservationlistComponent],
      imports: [HttpClientModule, SharedModule, TranslateModule.forRoot(), NgxDatatableModule, RouterTestingModule,TabsModule.forRoot(),AlertModule],
      providers: [ObservationService, ApiService,AlertService, UserService,DatePipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllobservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
