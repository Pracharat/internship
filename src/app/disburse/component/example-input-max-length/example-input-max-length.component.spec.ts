import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleInputMaxLengthComponent } from './example-input-max-length.component';

describe('ExampleInputMaxLengthComponent', () => {
  let component: ExampleInputMaxLengthComponent;
  let fixture: ComponentFixture<ExampleInputMaxLengthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleInputMaxLengthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleInputMaxLengthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
