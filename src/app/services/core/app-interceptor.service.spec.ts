import { TestBed } from '@angular/core/testing';

import { AppInterceptor } from './app-interceptor.service';

describe('AppInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppInterceptor = TestBed.get(AppInterceptor);
    expect(service).toBeTruthy();
  });
});
