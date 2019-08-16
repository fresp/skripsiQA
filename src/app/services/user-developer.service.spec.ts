import { TestBed } from '@angular/core/testing';

import { UserDeveloperService } from './user-developer.service';

describe('UserDeveloperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserDeveloperService = TestBed.get(UserDeveloperService);
    expect(service).toBeTruthy();
  });
});
