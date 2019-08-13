import { TestBed } from '@angular/core/testing';

import { UserPmService } from './user-pm.service';

describe('UserPmService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserPmService = TestBed.get(UserPmService);
    expect(service).toBeTruthy();
  });
});
