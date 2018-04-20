import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { EulistobligationsComponent } from './eulistobligations.component';

describe('EulistobligationsComponent', () => {
  let component: EulistobligationsComponent;
  let fixture: ComponentFixture<EulistobligationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EulistobligationsComponent ],
      imports: [TranslateModule.forRoot()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EulistobligationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
