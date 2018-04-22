import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationmapComponent } from './observationmap.component';

describe('ObservationmapComponent', () => {
  let component: ObservationmapComponent;
  let fixture: ComponentFixture<ObservationmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservationmapComponent ]
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
