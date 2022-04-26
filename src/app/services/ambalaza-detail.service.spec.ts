import { TestBed } from '@angular/core/testing';

import { AmbalazaDetailService } from './ambalaza-detail.service';

describe('AmbalazaDetailService', () => {
  let service: AmbalazaDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmbalazaDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
