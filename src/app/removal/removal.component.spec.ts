import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OmnisearchComponent } from '../shared/omnisearch/omnisearch.component'

import { RemovalComponent } from './removal.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { TaxonService } from '../shared/service/taxon.service';
import { ApiService } from '../shared/api/api.service';

describe('RemovalComponent', () => {
  let component: RemovalComponent;
  let fixture: ComponentFixture<RemovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemovalComponent],
      imports: [SharedModule, FormsModule, RouterTestingModule, HttpClientModule, TranslateModule.forRoot()],
      providers: [TaxonService, ApiService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
