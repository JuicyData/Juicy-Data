import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionalOprComponent } from './regional-opr.component';

describe('RegionalOprComponent', () => {
  let component: RegionalOprComponent;
  let fixture: ComponentFixture<RegionalOprComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionalOprComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionalOprComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
