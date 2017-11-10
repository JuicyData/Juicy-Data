import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurningLeagueChampionshipComponent } from './turning-league-championship.component';

describe('TurningLeagueChampionshipComponent', () => {
  let component: TurningLeagueChampionshipComponent;
  let fixture: ComponentFixture<TurningLeagueChampionshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurningLeagueChampionshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurningLeagueChampionshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
