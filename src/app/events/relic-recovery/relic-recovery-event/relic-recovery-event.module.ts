import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

import { RelicRecoveryEventComponent } from './relic-recovery-event.component';

import { RouterModule } from '@angular/router';

const routes = [
  { path: '', component: RelicRecoveryEventComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    DataTablesModule,
    FormsModule
  ],
  declarations: [RelicRecoveryEventComponent]
})
export class RelicRecoveryEventModule {}
