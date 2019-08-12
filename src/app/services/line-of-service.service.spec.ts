import { TestBed } from '@angular/core/testing';

import { LineOfServiceService } from './line-of-service.service';

describe('LineOfServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LineOfServiceService = TestBed.get(LineOfServiceService);
    expect(service).toBeTruthy();
  });
});
