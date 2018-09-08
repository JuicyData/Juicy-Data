import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TetrixVsVexproTheFactsComponent } from './tetrix-vs-vexpro-the-facts.component';

describe('TetrixVsVexproTheFactsComponent', () => {
  let component: TetrixVsVexproTheFactsComponent;
  let fixture: ComponentFixture<TetrixVsVexproTheFactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TetrixVsVexproTheFactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TetrixVsVexproTheFactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
