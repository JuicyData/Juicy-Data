import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SdLeagueRegistrationComponent } from './sd-league-registration.component';

import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

describe('SdLeagueRegistrationComponent', () => {
  let component: SdLeagueRegistrationComponent;
  let fixture: ComponentFixture<SdLeagueRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SdLeagueRegistrationComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        FormsModule
      ]
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
