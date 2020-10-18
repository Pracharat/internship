import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleScrollServiceComponent } from './example-scroll-service.component';

describe('ExampleScrollServiceComponent', () => {
  let component: ExampleScrollServiceComponent;
  let fixture: ComponentFixture<ExampleScrollServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleScrollServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleScrollServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
