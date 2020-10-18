import { TestBed } from '@angular/core/testing';

import { ToggleMenuService } from './toggle-menu.service';

describe('ToggleMenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToggleMenuService = TestBed.get(ToggleMenuService);
    expect(service).toBeTruthy();
  });
});
