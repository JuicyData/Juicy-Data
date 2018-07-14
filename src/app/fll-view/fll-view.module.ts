import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

import { FllViewComponent } from './fll-view.component';

import { RouterModule } from '@angular/router';

const routes = [
  { path: '', component: FllViewComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    DataTablesModule
  ],
  declarations: [FllViewComponent]
})
export class FllViewModule {}
