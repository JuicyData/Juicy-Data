import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TetrixVsVexproTheFactsComponent } from '../tetrix-vs-vexpro-the-facts/tetrix-vs-vexpro-the-facts.component';
import { OptInEmailModule } from '../opt-in-email/opt-in-email.module';

import { RouterModule } from '@angular/router';

const routes = [
  { path: '', component: TetrixVsVexproTheFactsComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OptInEmailModule
  ],
  declarations: [TetrixVsVexproTheFactsComponent]
})
export class TetrixVsVexproTheFactsModule {}
