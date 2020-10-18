import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EligiblePersonComponent } from './eligible-person.component';

describe('EligiblePersonComponent', () => {
  let component: EligiblePersonComponent;
  let fixture: ComponentFixture<EligiblePersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EligiblePersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EligiblePersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
