import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VelocityVortexComponent } from './velocity-vortex.component';

describe('VelocityVortexComponent', () => {
  let component: VelocityVortexComponent;
  let fixture: ComponentFixture<VelocityVortexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VelocityVortexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VelocityVortexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
