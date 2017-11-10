import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelicRecoveryComponent } from './relic-recovery.component';

describe('RelicRecoveryComponent', () => {
  let component: RelicRecoveryComponent;
  let fixture: ComponentFixture<RelicRecoveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelicRecoveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelicRecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
