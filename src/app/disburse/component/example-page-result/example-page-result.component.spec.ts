import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamplePageResultComponent } from './example-page-result.component';

describe('ExamplePageResultComponent', () => {
  let component: ExamplePageResultComponent;
  let fixture: ComponentFixture<ExamplePageResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamplePageResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamplePageResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
