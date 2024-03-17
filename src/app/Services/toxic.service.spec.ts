import { TestBed } from '@angular/core/testing';

import { ToxicService } from './toxic.service';

describe('ToxicService', () => {
  let service: ToxicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToxicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
