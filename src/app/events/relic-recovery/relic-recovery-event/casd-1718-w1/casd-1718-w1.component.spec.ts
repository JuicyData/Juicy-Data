import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Casd1718W1Component } from './casd-1718-w1.component';

describe('Casd1718W1Component', () => {
  let component: Casd1718W1Component;
  let fixture: ComponentFixture<Casd1718W1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Casd1718W1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Casd1718W1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
