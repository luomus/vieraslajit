import { LabelPipe } from './label.pipe';
import { MetadataService } from '../service/metadata.service';
import { inject, TestBed } from '@angular/core/testing';
import { ApiService } from '../api/api.service';
import { HttpClientModule } from '@angular/common/http';

describe('LabelPipe', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [MetadataService, ApiService]
    });
  });

  it('create an instance', inject([MetadataService], (service: MetadataService) => {
    const pipe = new LabelPipe(service);
    expect(pipe).toBeTruthy();
  })
  );
});
