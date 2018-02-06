import { TestBed, inject } from '@angular/core/testing';

import { TaxonService } from './taxon.service';
import { ApiService } from '../api/api.service';
import { HttpClientModule } from '@angular/common/http';

describe('TaxonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [TaxonService, ApiService]
    });
  });

  it('should be created', inject([TaxonService], (service: TaxonService) => {
    expect(service).toBeTruthy();
  }));
});
