import { TestBed } from '@angular/core/testing';

import { AmbalazaserviceService } from './ambalazaservice.service';

describe('AmbalazaserviceService', () => {
  let service: AmbalazaserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmbalazaserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
