import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FllComponent } from './fll.component';

describe('FllComponent', () => {
  let component: FllComponent;
  let fixture: ComponentFixture<FllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
