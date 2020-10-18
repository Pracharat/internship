import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListViewSwitcherComponent } from './list-view-switcher.component';

describe('ListViewSwitcherComponent', () => {
  let component: ListViewSwitcherComponent;
  let fixture: ComponentFixture<ListViewSwitcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListViewSwitcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListViewSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
