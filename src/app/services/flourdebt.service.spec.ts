import { TestBed } from '@angular/core/testing';

import { FlourdebtService } from './flourdebt.service';

describe('FlourdebtService', () => {
  let service: FlourdebtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlourdebtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
