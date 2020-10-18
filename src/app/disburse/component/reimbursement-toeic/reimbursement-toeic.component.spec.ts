import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReimbursementToeicComponent } from './reimbursement-toeic.component';

describe('ReimbursementToeicComponent', () => {
  let component: ReimbursementToeicComponent;
  let fixture: ComponentFixture<ReimbursementToeicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReimbursementToeicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReimbursementToeicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
