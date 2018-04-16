import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllobservationsComponent } from './allobservations.component';

describe('AllobservationsComponent', () => {
  let component: AllobservationsComponent;
  let fixture: ComponentFixture<AllobservationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllobservationsComponent ]
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
