import { TestBed, inject } from '@angular/core/testing';

import { TaxonService } from './taxon.service';

describe('TaxonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaxonService]
    });
  });

  it('should be created', inject([TaxonService], (service: TaxonService) => {
    expect(service).toBeTruthy();
  }));
});
