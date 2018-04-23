import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationmapComponent } from './observationmap.component';
import { ObservationService } from '../../shared/service/observation.service';
import { ApiService } from '../../shared/api/api.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../../shared/shared.module';


describe('ObservationmapComponent', () => {
  let component: ObservationmapComponent;
  let fixture: ComponentFixture<ObservationmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservationmapComponent ],
      imports:[HttpClientModule,SharedModule],
      providers:[ObservationService, ApiService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservationmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
