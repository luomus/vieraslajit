import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxonCardComponent } from './taxon-card.component';

describe('TaxonCardComponent', () => {
  let component: TaxonCardComponent;
  let fixture: ComponentFixture<TaxonCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxonCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
