import { TestBed } from '@angular/core/testing';

import { InvitedAlumniService } from './invited-alumni.service';

describe('InvitedAlumniService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InvitedAlumniService = TestBed.get(InvitedAlumniService);
    expect(service).toBeTruthy();
  });
});
