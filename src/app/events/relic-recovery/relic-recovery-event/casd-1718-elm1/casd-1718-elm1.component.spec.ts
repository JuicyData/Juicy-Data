import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Casd1718Elm1Component } from './casd-1718-elm1.component';

describe('Casd1718Elm1Component', () => {
  let component: Casd1718Elm1Component;
  let fixture: ComponentFixture<Casd1718Elm1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Casd1718Elm1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Casd1718Elm1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
