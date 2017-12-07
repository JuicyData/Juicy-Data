import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DescartesLeagueChampionshipComponent } from './descartes-league-championship.component';

describe('DescartesLeagueChampionshipComponent', () => {
  let component: DescartesLeagueChampionshipComponent;
  let fixture: ComponentFixture<DescartesLeagueChampionshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DescartesLeagueChampionshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DescartesLeagueChampionshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
