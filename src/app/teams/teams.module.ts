import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TeamsComponent } from './teams.component';

import { RouterModule } from '@angular/router';

const routes = [
  { path: ':teamNumber', component: TeamsComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  declarations: [TeamsComponent]
})
export class TeamsModule {}
