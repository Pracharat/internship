import { TestBed } from '@angular/core/testing';

import { DisburseService } from './disburse.service';

describe('DisburseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DisburseService = TestBed.get(DisburseService);
    expect(service).toBeTruthy();
  });
});
