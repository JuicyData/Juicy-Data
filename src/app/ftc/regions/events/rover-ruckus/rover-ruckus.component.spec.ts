import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoverRuckusComponent } from './rover-ruckus.component';

describe('RoverRuckusEventComponent', () => {
  let component: RoverRuckusComponent;
  let fixture: ComponentFixture<RoverRuckusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoverRuckusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoverRuckusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
