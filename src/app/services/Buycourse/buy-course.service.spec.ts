import { TestBed } from '@angular/core/testing';

import { BuyCourseService } from './buy-course.service';

describe('BuyCourseService', () => {
  let service: BuyCourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyCourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
