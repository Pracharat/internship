import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleDataListComponent } from './example-data-list.component';

describe('ExampleDataListComponent', () => {
  let component: ExampleDataListComponent;
  let fixture: ComponentFixture<ExampleDataListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleDataListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleDataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
