import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';
import { ApiService } from '../api/api.service'
import { HttpClientModule } from '@angular/common/http';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [UserService, ApiService]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
