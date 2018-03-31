import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { ObservationService } from './observation.service';
import { ApiService } from '../api/api.service';

describe('ObservationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [ObservationService, ApiService]
    });
  });

  it('should be created', inject([ObservationService], (service: ObservationService) => {
    expect(service).toBeTruthy();
  }));
});