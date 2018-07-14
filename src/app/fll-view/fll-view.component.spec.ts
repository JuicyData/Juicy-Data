import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FllViewComponent } from './fll-view.component';

describe('FllViewComponent', () => {
  let component: FllViewComponent;
  let fixture: ComponentFixture<FllViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FllViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FllViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
