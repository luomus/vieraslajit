import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilistobligationsComponent } from './filistobligations.component';
import { TranslateModule } from '@ngx-translate/core';

describe('FilistobligationsComponent', () => {
  let component: FilistobligationsComponent;
  let fixture: ComponentFixture<FilistobligationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilistobligationsComponent ],
      imports: [TranslateModule.forRoot()]
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
