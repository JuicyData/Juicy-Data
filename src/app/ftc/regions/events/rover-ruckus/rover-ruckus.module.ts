import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoverRuckusService } from './event-services/rover-ruckus.service';

import { RoverRuckusComponent } from './rover-ruckus.component';

import { RouterModule } from '@angular/router';

const routes = [
  { path: '', component: RoverRuckusComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule
  ],
  declarations: [RoverRuckusComponent],
  providers: [RoverRuckusService]
})
export class RoverRuckusModule {}
