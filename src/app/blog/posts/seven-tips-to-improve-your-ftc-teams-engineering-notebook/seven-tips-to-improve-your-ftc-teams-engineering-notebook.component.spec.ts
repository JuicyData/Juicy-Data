import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SevenTipsToImproveYourFtcTeamsEngineeringNotebookComponent } from './seven-tips-to-improve-your-ftc-teams-engineering-notebook.component';
import { OptInEmailComponent } from '../opt-in-email/opt-in-email.component';

describe('SevenTipsToImproveYourFtcTeamsEngineeringNotebookComponent', () => {
  let component: SevenTipsToImproveYourFtcTeamsEngineeringNotebookComponent;
  let fixture: ComponentFixture<SevenTipsToImproveYourFtcTeamsEngineeringNotebookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SevenTipsToImproveYourFtcTeamsEngineeringNotebookComponent, OptInEmailComponent ],
      imports: [
        FormsModule,
        HttpClientModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SevenTipsToImproveYourFtcTeamsEngineeringNotebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
