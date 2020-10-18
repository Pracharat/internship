import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFormDialogComponent } from './update-form-dialog.component';

describe('UpdateFormDialogComponent', () => {
  let component: UpdateFormDialogComponent;
  let fixture: ComponentFixture<UpdateFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
