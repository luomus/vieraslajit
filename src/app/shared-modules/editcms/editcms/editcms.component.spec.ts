import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcmsComponent } from './editcms.component';

describe('EditcmsComponent', () => {
  let component: EditcmsComponent;
  let fixture: ComponentFixture<EditcmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditcmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
