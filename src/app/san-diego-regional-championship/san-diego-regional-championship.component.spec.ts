import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SanDiegoRegionalChampionshipComponent } from './san-diego-regional-championship.component';

describe('SanDiegoRegionalChampionshipComponent', () => {
  let component: SanDiegoRegionalChampionshipComponent;
  let fixture: ComponentFixture<SanDiegoRegionalChampionshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SanDiegoRegionalChampionshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SanDiegoRegionalChampionshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
