import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

import { FllComponent } from './fll.component';

import { RouterModule } from '@angular/router';

const routes = [
  { path: '', component: FllComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    DataTablesModule
  ],
  declarations: [FllComponent]
})
export class FllModule {}
