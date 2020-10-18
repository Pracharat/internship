import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleListViewSwitcherComponent } from './example-list-view-switcher.component';

describe('ExampleListViewSwitcherComponent', () => {
  let component: ExampleListViewSwitcherComponent;
  let fixture: ComponentFixture<ExampleListViewSwitcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleListViewSwitcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleListViewSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
