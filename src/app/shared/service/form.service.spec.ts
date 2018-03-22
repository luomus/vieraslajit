import { TestBed, inject } from '@angular/core/testing';

import { FormService } from './form.service';
import { ApiService } from '../api/api.service';
import { HttpClientModule } from '@angular/common/http';

describe('FormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [FormService, ApiService]
    });
  });

  it('should be created', inject([FormService], (service: FormService) => {
    expect(service).toBeTruthy();
  }));
});
