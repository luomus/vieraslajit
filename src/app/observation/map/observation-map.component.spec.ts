import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservationMapComponent } from './observation-map.component';

describe('ObservationMapComponent', () => {
  let component: ObservationMapComponent;
  let fixture: ComponentFixture<ObservationMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservationMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservationMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
