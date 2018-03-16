import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EulistComponent } from './eulist.component';

describe('EulistComponent', () => {
  let component: EulistComponent;
  let fixture: ComponentFixture<EulistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EulistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EulistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
