import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FllInputComponent } from './fll-input.component';

describe('FllInputComponent', () => {
  let component: FllInputComponent;
  let fixture: ComponentFixture<FllInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FllInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FllInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
