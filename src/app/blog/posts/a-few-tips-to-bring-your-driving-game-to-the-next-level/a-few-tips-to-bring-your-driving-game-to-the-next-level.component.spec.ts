import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AFewTipsToBringYourDrivingGameToTheNextLevelComponent } from './a-few-tips-to-bring-your-driving-game-to-the-next-level.component';
import { OptInEmailComponent } from '../opt-in-email/opt-in-email.component';

describe('AFewTipsToBringYourDrivingGameToTheNextLevelComponent', () => {
  let component: AFewTipsToBringYourDrivingGameToTheNextLevelComponent;
  let fixture: ComponentFixture<AFewTipsToBringYourDrivingGameToTheNextLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AFewTipsToBringYourDrivingGameToTheNextLevelComponent, OptInEmailComponent ],
      imports: [
        FormsModule,
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AFewTipsToBringYourDrivingGameToTheNextLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
