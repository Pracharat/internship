import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamplePaginatorComponent } from './example-paginator.component';

describe('ExamplePaginatorComponent', () => {
  let component: ExamplePaginatorComponent;
  let fixture: ComponentFixture<ExamplePaginatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamplePaginatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamplePaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
