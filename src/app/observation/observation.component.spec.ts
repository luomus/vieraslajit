import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationComponent } from './observation.component';
import { ObservationService } from '../shared/service/observation.service';
import { ApiService } from '../shared/api/api.service';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

describe('ObservationComponent', () => {
  let component: ObservationComponent;
  let fixture: ComponentFixture<ObservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservationComponent ],
      imports: [HttpClientModule, TranslateModule.forRoot()],
      providers: [ObservationService,ApiService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
