import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleInputTrimComponent } from './example-input-trim.component';

describe('ExampleInputTrimComponent', () => {
  let component: ExampleInputTrimComponent;
  let fixture: ComponentFixture<ExampleInputTrimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleInputTrimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleInputTrimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
