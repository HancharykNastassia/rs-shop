import { TestBed } from '@angular/core/testing';

import { CanNavigateGuard } from './can-navigate.guard';

describe('CanNavigateGuard', () => {
  let guard: CanNavigateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CanNavigateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
