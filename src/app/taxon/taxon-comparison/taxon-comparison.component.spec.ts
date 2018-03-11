import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxonComparisonComponent } from './taxon-comparison.component';
import { LabelPipe } from '../../shared/pipe/label.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { TaxonService } from '../../shared/service/taxon.service';
import { ApiService } from '../../shared/api/api.service';
import { HttpClientModule } from '@angular/common/http';
import { MetadataService } from '../../shared/service/metadata.service';

describe('TaxonComparisonComponent', () => {
  let component: TaxonComparisonComponent;
  let fixture: ComponentFixture<TaxonComparisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaxonComparisonComponent, LabelPipe],
      imports: [TranslateModule.forRoot(), RouterTestingModule, HttpClientModule],
      providers: [TaxonService, ApiService, MetadataService]
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
