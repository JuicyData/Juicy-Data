import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { SevenTipsToImproveYourFtcTeamsEngineeringNotebookComponent } from '../seven-tips-to-improve-your-ftc-teams-engineering-notebook/seven-tips-to-improve-your-ftc-teams-engineering-notebook.component';
import { OptInEmailModule } from '../opt-in-email/opt-in-email.module';

const routes = [
  { path: '', component: SevenTipsToImproveYourFtcTeamsEngineeringNotebookComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OptInEmailModule
  ],
  declarations: [SevenTipsToImproveYourFtcTeamsEngineeringNotebookComponent]
})
export class SevenTipsToImproveYourFtcTeamsEngineeringNotebookModule {}
