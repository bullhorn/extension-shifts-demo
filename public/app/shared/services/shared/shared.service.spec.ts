import { TestBed, inject } from '@angular/core/testing';

import { ShiftsService } from './shifts.service';

describe('ShiftsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShiftsService]
    });
  });

  it('should ...', inject([ShiftsService], (service: ShiftsService) => {
    expect(service).toBeTruthy();
  }));
});
