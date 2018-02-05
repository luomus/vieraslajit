import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvasiveGuideComponent } from './invasive-guide.component';

describe('InvasiveGuideComponent', () => {
  let component: InvasiveGuideComponent;
  let fixture: ComponentFixture<InvasiveGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvasiveGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvasiveGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
