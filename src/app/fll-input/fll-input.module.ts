import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

import { FllInputComponent } from './fll-input.component';

import { RouterModule } from '@angular/router';

const routes = [
  { path: '', component: FllInputComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    DataTablesModule,
    FormsModule
  ],
  declarations: [FllInputComponent]
})
export class FllInputModule {}
