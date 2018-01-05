import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Casd1718Dlm1Component } from './casd-1718-dlm1.component';

describe('Casd1718Dlm1Component', () => {
  let component: Casd1718Dlm1Component;
  let fixture: ComponentFixture<Casd1718Dlm1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Casd1718Dlm1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Casd1718Dlm1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
