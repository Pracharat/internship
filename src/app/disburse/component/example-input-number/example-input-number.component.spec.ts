import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleInputNumberComponent } from './example-input-number.component';

describe('ExampleInputNumberComponent', () => {
  let component: ExampleInputNumberComponent;
  let fixture: ComponentFixture<ExampleInputNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleInputNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleInputNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
