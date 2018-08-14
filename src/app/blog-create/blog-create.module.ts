import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BlogCreateComponent } from './blog-create.component';

import { RouterModule } from '@angular/router';

const routes = [
  { path: '', component: BlogCreateComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [BlogCreateComponent]
})
export class BlogCreateModule {}
