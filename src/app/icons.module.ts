import { NgModule } from '@angular/core';

import {
  IconLogIn,
  IconLogOut,
  IconUser,
  IconArrowLeft,
  IconArrowRight,
  IconPieChart,
  IconBarChart,
  IconTrendingUp
} from 'angular-feather';

@NgModule({
  exports: [
    IconLogIn,
    IconLogOut,
    IconUser,
    IconArrowLeft,
    IconArrowRight,
    IconPieChart,
    IconBarChart,
    IconTrendingUp
  ]
})
export class IconsModule {}
