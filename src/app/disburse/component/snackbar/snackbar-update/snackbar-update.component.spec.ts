import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarUpdateComponent } from './snackbar-update.component';

describe('SnackbarUpdateComponent', () => {
  let component: SnackbarUpdateComponent;
  let fixture: ComponentFixture<SnackbarUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackbarUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackbarUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
