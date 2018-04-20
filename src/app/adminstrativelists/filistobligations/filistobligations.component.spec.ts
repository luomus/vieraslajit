import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilistobligationsComponent } from './filistobligations.component';

describe('FilistobligationsComponent', () => {
  let component: FilistobligationsComponent;
  let fixture: ComponentFixture<FilistobligationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilistobligationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilistobligationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
