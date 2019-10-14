import { TestBed, inject } from '@angular/core/testing';

import { OhlcService } from './ohlc.service';

describe('OhlcService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OhlcService]
    });
  });

  it('should be created', inject([OhlcService], (service: OhlcService) => {
    expect(service).toBeTruthy();
  }));
});
