import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaussLeagueChampionshipComponent } from './gauss-league-championship.component';

describe('GaussLeagueChampionshipComponent', () => {
  let component: GaussLeagueChampionshipComponent;
  let fixture: ComponentFixture<GaussLeagueChampionshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GaussLeagueChampionshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GaussLeagueChampionshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
