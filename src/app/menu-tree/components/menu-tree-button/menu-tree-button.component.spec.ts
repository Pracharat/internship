import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTreeButtonComponent } from './menu-tree-button.component';

describe('MenuTreeButtonComponent', () => {
  let component: MenuTreeButtonComponent;
  let fixture: ComponentFixture<MenuTreeButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuTreeButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuTreeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
