import { TestBed, inject } from '@angular/core/testing';

import { ListService } from './list.service';
import { ApiService } from '../api/api.service';
import { HttpClientModule } from '@angular/common/http';

describe('ListService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule],
      providers: [ListService,ApiService]
    });
  });

  it('should be created', inject([ListService], (service: ListService) => {
    expect(service).toBeTruthy();
  }));
});
