import { TestBed } from '@angular/core/testing';

import { MicroblogService } from './microblog.service';

describe('MicroblogService', () => {
  let service: MicroblogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MicroblogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
