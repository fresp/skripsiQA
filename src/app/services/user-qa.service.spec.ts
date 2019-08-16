import { TestBed } from '@angular/core/testing';

import { UserQaService } from './user-qa.service';

describe('UserQaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserQaService = TestBed.get(UserQaService);
    expect(service).toBeTruthy();
  });
});
