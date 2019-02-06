import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OmnisearchComponent } from './omnisearch.component';
import { TaxonService } from '../../shared/service/taxon.service';
import { ApiService } from '../../shared/api/api.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { GoogleSearchApiService } from '../api/google-search.api.service';
import { SpinnerModule } from '../../shared-modules/spinner/spinner.module';

describe('OmnisearchComponent', () => {
  let component: OmnisearchComponent;
  let fixture: ComponentFixture<OmnisearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations:[OmnisearchComponent],
      imports:[HttpClientModule,FormsModule,ReactiveFormsModule,RouterTestingModule, TranslateModule.forRoot(), SpinnerModule],
      providers:[ ApiService, TaxonService, GoogleSearchApiService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OmnisearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
