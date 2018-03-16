import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilistComponent } from './filist.component';

describe('FilistComponent', () => {
  let component: FilistComponent;
  let fixture: ComponentFixture<FilistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
