import { TestBed } from '@angular/core/testing';

import { ScreenDetector } from './screen-detector.service';

describe('ScreenDetector', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScreenDetector = TestBed.get(ScreenDetector);
    expect(service).toBeTruthy();
  });
});
