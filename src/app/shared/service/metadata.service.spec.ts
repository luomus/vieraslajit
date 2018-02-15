import { TestBed, inject } from '@angular/core/testing';

import { MetadataService } from './metadata.service';
import { ApiService } from '../api/api.service';
import { HttpClientModule } from '@angular/common/http';

describe('MetadataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [MetadataService, ApiService]
    });
  });

  it('should be created', inject([MetadataService], (service: MetadataService) => {
    expect(service).toBeTruthy();
  }));
});
