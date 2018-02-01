import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxonListComponent } from './taxon-list.component';

describe('TaxonListComponent', () => {
  let component: TaxonListComponent;
  let fixture: ComponentFixture<TaxonListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxonListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
