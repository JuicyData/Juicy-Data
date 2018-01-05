import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Casd1718Glm1Component } from './casd-1718-glm1.component';

describe('Casd1718Glm1Component', () => {
  let component: Casd1718Glm1Component;
  let fixture: ComponentFixture<Casd1718Glm1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Casd1718Glm1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Casd1718Glm1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
