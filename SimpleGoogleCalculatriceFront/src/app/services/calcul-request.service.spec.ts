import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CalculRequestService } from './calcul-request.service';

describe('CalculRequestService', () => {
  let service: CalculRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CalculRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
