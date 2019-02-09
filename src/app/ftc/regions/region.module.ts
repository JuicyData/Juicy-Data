import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegionComponent } from './region.component';

import { RouterModule } from '@angular/router';

const routes = [
  { path: '', component: RegionComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  declarations: [RegionComponent]
})
export class RegionModule {}
