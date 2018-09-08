import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TetrixVsVexproTheFactsComponent } from '../tetrix-vs-vexpro-the-facts/tetrix-vs-vexpro-the-facts.component';

import { RouterModule } from '@angular/router';

const routes = [
  { path: '', component: TetrixVsVexproTheFactsComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [TetrixVsVexproTheFactsComponent]
})
export class TetrixVsVexproTheFactsModule {}
