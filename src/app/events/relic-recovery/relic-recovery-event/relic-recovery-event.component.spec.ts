import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelicRecoveryEventComponent } from './relic-recovery-event.component';

describe('RelicRecoveryEventComponent', () => {
  let component: RelicRecoveryEventComponent;
  let fixture: ComponentFixture<RelicRecoveryEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelicRecoveryEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelicRecoveryEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
