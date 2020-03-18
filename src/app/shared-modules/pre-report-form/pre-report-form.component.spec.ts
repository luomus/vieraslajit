import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreReportFormComponent } from './pre-report-form.component';

describe('PreReportFormComponent', () => {
  let component: PreReportFormComponent;
  let fixture: ComponentFixture<PreReportFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreReportFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreReportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
