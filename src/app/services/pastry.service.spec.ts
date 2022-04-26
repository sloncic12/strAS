import { TestBed } from '@angular/core/testing';

import { PastryService } from './pastry.service';

describe('PastryService', () => {
  let service: PastryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PastryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
