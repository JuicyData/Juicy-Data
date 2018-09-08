import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionMakingComponent } from './decision-making.component';

describe('DecisionMakingComponent', () => {
  let component: DecisionMakingComponent;
  let fixture: ComponentFixture<DecisionMakingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecisionMakingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecisionMakingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
