import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { TaxonListComponent } from './taxon-list.component';
import { TaxonService } from '../../shared/service/taxon.service';
import { ApiService } from '../../shared/api/api.service';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../shared/shared.module';
 
describe('TaxonListComponent', () => {
  let component: TaxonListComponent;
  let fixture: ComponentFixture<TaxonListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaxonListComponent],
      imports: [FormsModule, RouterTestingModule, HttpClientModule, SharedModule, TranslateModule.forRoot()],
      providers: [TaxonService, ApiService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxonListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
