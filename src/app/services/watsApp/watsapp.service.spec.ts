import { TestBed } from '@angular/core/testing';

import { WatsappService } from './watsapp.service';

describe('WatsappService', () => {
  let service: WatsappService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WatsappService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
