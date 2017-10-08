import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputScheduleComponent } from './input-schedule.component';

describe('InputScheduleComponent', () => {
  let component: InputScheduleComponent;
  let fixture: ComponentFixture<InputScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
