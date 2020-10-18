import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuTreeButtonIconComponent } from './menu-tree-button-icon.component';

describe('MenuTreeButtonIconComponent', () => {
  let component: MenuTreeButtonIconComponent;
  let fixture: ComponentFixture<MenuTreeButtonIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuTreeButtonIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuTreeButtonIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
