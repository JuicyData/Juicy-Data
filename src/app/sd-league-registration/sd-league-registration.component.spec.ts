import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdLeagueRegistrationComponent } from './sd-league-registration.component';

describe('SdLeagueRegistrationComponent', () => {
  let component: SdLeagueRegistrationComponent;
  let fixture: ComponentFixture<SdLeagueRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdLeagueRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SdLeagueRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
