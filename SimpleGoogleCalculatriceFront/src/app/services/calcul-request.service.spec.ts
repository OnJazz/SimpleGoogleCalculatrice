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

  it('should return a string representing a digit from the service', () => {
    service.getResultFromCalcul("2+2").subscribe(res => {
      expect(res).toBe("4");
    })
    expect(service).toBeTruthy();
  });
});
