import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EuclidLeagueChampionshipComponent } from './euclid-league-championship.component';

describe('EuclidLeagueChampionshipComponent', () => {
  let component: EuclidLeagueChampionshipComponent;
  let fixture: ComponentFixture<EuclidLeagueChampionshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EuclidLeagueChampionshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EuclidLeagueChampionshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
