import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OmnisearchComponent } from './omnisearch.component';
import { TaxonService } from '../../shared/service/taxon.service';
import { ApiService } from '../../shared/api/api.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('OmnisearchComponent', () => {
  let component: OmnisearchComponent;
  let fixture: ComponentFixture<OmnisearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations:[OmnisearchComponent],
      imports:[HttpClientModule,FormsModule,ReactiveFormsModule,RouterTestingModule],
      providers:[ ApiService, TaxonService ]
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
