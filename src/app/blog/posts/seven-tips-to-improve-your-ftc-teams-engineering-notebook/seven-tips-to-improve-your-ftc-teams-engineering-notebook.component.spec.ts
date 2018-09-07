import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SevenTipsToImproveYourFtcTeamsEngineeringNotebookComponent } from './seven-tips-to-improve-your-ftc-teams-engineering-notebook.component';

describe('SevenTipsToImproveYourFtcTeamsEngineeringNotebookComponent', () => {
  let component: SevenTipsToImproveYourFtcTeamsEngineeringNotebookComponent;
  let fixture: ComponentFixture<SevenTipsToImproveYourFtcTeamsEngineeringNotebookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SevenTipsToImproveYourFtcTeamsEngineeringNotebookComponent ]
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
