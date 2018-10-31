import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DecisionMakingComponent } from '../decision-making/decision-making.component';
import { OptInEmailComponent } from '../opt-in-email/opt-in-email.component';


import { RouterModule } from '@angular/router';

const routes = [
  { path: '', component: DecisionMakingComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [DecisionMakingComponent, OptInEmailComponent]
})
export class DecisionMakingModule {}
