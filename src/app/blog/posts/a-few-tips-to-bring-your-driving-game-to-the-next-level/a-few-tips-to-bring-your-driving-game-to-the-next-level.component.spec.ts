import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AFewTipsToBringYourDrivingGameToTheNextLevelComponent } from './a-few-tips-to-bring-your-driving-game-to-the-next-level.component';

describe('AFewTipsToBringYourDrivingGameToTheNextLevelComponent', () => {
  let component: AFewTipsToBringYourDrivingGameToTheNextLevelComponent;
  let fixture: ComponentFixture<AFewTipsToBringYourDrivingGameToTheNextLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AFewTipsToBringYourDrivingGameToTheNextLevelComponent ]
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
