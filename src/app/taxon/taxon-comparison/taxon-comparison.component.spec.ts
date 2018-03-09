import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxonComparisonComponent } from './taxon-comparison.component';

describe('TaxonComparisonComponent', () => {
  let component: TaxonComparisonComponent;
  let fixture: ComponentFixture<TaxonComparisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxonComparisonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxonComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
