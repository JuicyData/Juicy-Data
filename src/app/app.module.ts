import { DataTablesModule } from 'angular-datatables';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';

import { InputScheduleComponent } from './input-schedule/input-schedule.component';
import { GaussLeagueChampionshipComponent } from './events/velocity-vortex/gauss-league-championship/gauss-league-championship.component';
import { SanDiegoRegionalChampionshipComponent } from './events/velocity-vortex/san-diego-regional-championship/san-diego-regional-championship.component';
import { TuringLeagueChampionshipComponent } from './events/velocity-vortex/turing-league-championship/turing-league-championship.component';
import { EuclidLeagueChampionshipComponent } from './events/velocity-vortex/euclid-league-championship/euclid-league-championship.component';
import { DescartesLeagueChampionshipComponent } from './events/velocity-vortex/descartes-league-championship/descartes-league-championship.component';
import { VelocityVortexComponent } from './events/velocity-vortex/velocity-vortex.component';
import { RelicRecoveryComponent } from './events/relic-recovery/relic-recovery.component';
import { RelicRecoveryEventComponent } from './events/relic-recovery/relic-recovery-event/relic-recovery-event.component';

const ROUTES = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'events/velocity-vortex',
    component: VelocityVortexComponent
  },
  {
    path: 'events',
    component: RelicRecoveryComponent
  },
  {
    path: 'events/relic-recovery',
    component: RelicRecoveryComponent
  },
  {
    path: 'events/relic-recovery/:week/:event',
    component: RelicRecoveryEventComponent
  },
  {
    path: 'events/velocity-vortex/gauss-league-championship',
    component: GaussLeagueChampionshipComponent
  },
  {
    path: 'events/velocity-vortex/san-diego-regional-championship',
    component: SanDiegoRegionalChampionshipComponent
  },
  {
    path: 'events/velocity-vortex/turing-league-championship',
    component: TuringLeagueChampionshipComponent
  },
  {
    path: 'events/velocity-vortex/descartes-league-championship',
    component: DescartesLeagueChampionshipComponent
  },
  {
    path: 'events/velocity-vortex/euclid-league-championship',
    component: EuclidLeagueChampionshipComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    HomeComponent,
    InputScheduleComponent,
    HomeComponent,
    GaussLeagueChampionshipComponent,
    SanDiegoRegionalChampionshipComponent,
    TuringLeagueChampionshipComponent,
    EuclidLeagueChampionshipComponent,
    DescartesLeagueChampionshipComponent,
    VelocityVortexComponent,
    RelicRecoveryComponent,
    RelicRecoveryEventComponent
  ],
  imports: [
    DataTablesModule,
    BrowserModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
