import { TestBed, inject } from '@angular/core/testing';

import { InformationService } from './information.service';
import { ApiService, LajiApi } from '../api/api.service';
import { HttpClientModule } from '@angular/common/http';


describe('InformationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [InformationService, ApiService]
    });
  });

  it('should be created', inject([InformationService], (service: InformationService) => {
    expect(service).toBeTruthy();
  }));
});
