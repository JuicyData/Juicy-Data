import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TuringLeagueChampionshipComponent } from './turing-league-championship.component';

describe('TuringLeagueChampionshipComponent', () => {
  let component: TuringLeagueChampionshipComponent;
  let fixture: ComponentFixture<TuringLeagueChampionshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TuringLeagueChampionshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TuringLeagueChampionshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
