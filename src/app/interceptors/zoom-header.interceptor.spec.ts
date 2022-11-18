import { TestBed } from '@angular/core/testing';

import { ZoomHeaderInterceptor } from './zoom-header.interceptor';

describe('ZoomHeaderInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ZoomHeaderInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ZoomHeaderInterceptor = TestBed.inject(ZoomHeaderInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
