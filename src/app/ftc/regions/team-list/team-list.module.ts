import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TeamListComponent } from './team-list.component';

import { RouterModule } from '@angular/router';

const routes = [
  { path: '', component: TeamListComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [TeamListComponent]
})
export class TeamListModule {}
