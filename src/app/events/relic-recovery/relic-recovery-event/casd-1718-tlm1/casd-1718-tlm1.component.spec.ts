import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Casd1718Tlm1Component } from './casd-1718-tlm1.component';

describe('Casd1718Tlm1Component', () => {
  let component: Casd1718Tlm1Component;
  let fixture: ComponentFixture<Casd1718Tlm1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Casd1718Tlm1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Casd1718Tlm1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
