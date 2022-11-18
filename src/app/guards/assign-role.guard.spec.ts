import { TestBed } from '@angular/core/testing';

import { AssignRoleGuard } from './assign-role.guard';

describe('AssignRoleGuard', () => {
  let guard: AssignRoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AssignRoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
