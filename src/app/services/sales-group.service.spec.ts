import { TestBed } from '@angular/core/testing';

import { SalesGroupService } from './sales-group.service';

describe('SalesGroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalesGroupService = TestBed.get(SalesGroupService);
    expect(service).toBeTruthy();
  });
});
