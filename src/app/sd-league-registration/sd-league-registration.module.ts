import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SdLeagueRegistrationComponent } from './sd-league-registration.component';

import { RouterModule } from '@angular/router';

const routes = [
  { path: '', component: SdLeagueRegistrationComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [SdLeagueRegistrationComponent]
})
export class SdLeagueRegistrationModule {}
