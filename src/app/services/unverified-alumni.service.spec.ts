import { TestBed } from '@angular/core/testing';

import { UnverifiedAlumniService } from './unverified-alumni.service';

describe('UnverifiedAlumniService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnverifiedAlumniService = TestBed.get(UnverifiedAlumniService);
    expect(service).toBeTruthy();
  });
});
