import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OmnisearchComponent } from '../shared/omnisearch/omnisearch.component'

import { EradicationComponent } from './eradication.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { TaxonService } from '../shared/service/taxon.service';
import { ApiService } from '../shared/api/api.service';
import { StaticModule } from '../static/static.module';

describe('EradicationComponent', () => {
  let component: EradicationComponent;
  let fixture: ComponentFixture<EradicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EradicationComponent],
      imports: [SharedModule, FormsModule, RouterTestingModule, HttpClientModule, TranslateModule.forRoot(), StaticModule],
      providers: [TaxonService, ApiService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EradicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
