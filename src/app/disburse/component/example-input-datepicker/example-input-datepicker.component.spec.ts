import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleInputDatepickerComponent } from './example-input-datepicker.component';

describe('ExampleInputDatepickerComponent', () => {
  let component: ExampleInputDatepickerComponent;
  let fixture: ComponentFixture<ExampleInputDatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleInputDatepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleInputDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
