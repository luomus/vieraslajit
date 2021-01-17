import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TaxonCardComponent } from './taxon-card.component';
import { TaxonService } from '../../shared/service/taxon.service';
import { ApiService } from '../../shared/api/api.service';
import { HttpClientModule } from '@angular/common/http';
import { LabelPipe } from '../../shared/pipe/label.pipe';
import { MetadataService } from '../../shared/service/metadata.service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CollapseModule, AccordionModule, CarouselModule, ModalModule } from 'ngx-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { OmnisearchComponent } from '../../shared/omnisearch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ObservationService } from '../../shared/service/observation.service';
import { SpinnerModule } from '../../shared-modules/spinner/spinner.module';
import { ObservationMapModule } from '../../shared-modules/observation-map/observation-map.module';

describe('TaxonCardComponent', () => {
  let component: TaxonCardComponent;
  let fixture: ComponentFixture<TaxonCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaxonCardComponent, LabelPipe, OmnisearchComponent],
      imports: [HttpClientModule, TranslateModule.forRoot(), CollapseModule.forRoot(), ObservationMapModule,
        RouterTestingModule, FormsModule, ReactiveFormsModule, AccordionModule, SpinnerModule, CarouselModule, ModalModule.forRoot()],
      providers: [TaxonService, ApiService, TranslateService, MetadataService, ObservationService]
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
