import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViekasComponent } from './viekas.component';

describe('ViekasComponent', () => {
  let component: ViekasComponent;
  let fixture: ComponentFixture<ViekasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViekasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViekasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
