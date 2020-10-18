import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleNoDataComponent } from './example-no-data.component';

describe('ExampleNoDataComponent', () => {
  let component: ExampleNoDataComponent;
  let fixture: ComponentFixture<ExampleNoDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleNoDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleNoDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
