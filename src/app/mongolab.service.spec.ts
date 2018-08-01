import { TestBed, inject } from '@angular/core/testing';

import { MongolabService } from './mongolab.service';

describe('MongolabService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MongolabService]
    });
  });

  it('should be created', inject([MongolabService], (service: MongolabService) => {
    expect(service).toBeTruthy();
  }));
});
