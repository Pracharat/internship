import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleItemPerPageComponent } from './example-item-per-page.component';

describe('ExampleItemPerPageComponent', () => {
  let component: ExampleItemPerPageComponent;
  let fixture: ComponentFixture<ExampleItemPerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleItemPerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleItemPerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
