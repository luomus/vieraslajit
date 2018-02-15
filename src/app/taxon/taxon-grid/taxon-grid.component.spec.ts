import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxonGridComponent } from './taxon-grid.component';

describe('TaxonGridComponent', () => {
  let component: TaxonGridComponent;
  let fixture: ComponentFixture<TaxonGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxonGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxonGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
