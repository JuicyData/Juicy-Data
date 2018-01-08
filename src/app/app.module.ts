import { DataTablesModule } from 'angular-datatables';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';

import { InputScheduleComponent } from './input-schedule/input-schedule.component';
import { GaussLeagueChampionshipComponent } from './events/velocity-vortex/gauss-league-championship/gauss-league-championship.component';
import { SanDiegoRegionalChampionshipComponent } from './events/velocity-vortex/san-diego-regional-championship/san-diego-regional-championship.component';
import { TuringLeagueChampionshipComponent } from './events/velocity-vortex/turing-league-championship/turing-league-championship.component';
import { EuclidLeagueChampionshipComponent } from './events/velocity-vortex/euclid-league-championship/euclid-league-championship.component';
import { DescartesLeagueChampionshipComponent } from './events/velocity-vortex/descartes-league-championship/descartes-league-championship.component';
import { VelocityVortexComponent } from './events/velocity-vortex/velocity-vortex.component';
import { RelicRecoveryComponent } from './events/relic-recovery/relic-recovery.component';
import { RelicRecoveryEventComponent } from './events/relic-recovery/relic-recovery-event/relic-recovery-event.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { Casd1718Tlm1Component } from './events/relic-recovery/relic-recovery-event/casd-1718-tlm1/casd-1718-tlm1.component';
import { Casd1718Dlm1Component } from './events/relic-recovery/relic-recovery-event/casd-1718-dlm1/casd-1718-dlm1.component';
import { Casd1718Glm1Component } from './events/relic-recovery/relic-recovery-event/casd-1718-glm1/casd-1718-glm1.component';
import { Casd1718Elm1Component } from './events/relic-recovery/relic-recovery-event/casd-1718-elm1/casd-1718-elm1.component';
import { Casd1718W1Component } from './events/relic-recovery/relic-recovery-event/casd-1718-w1/casd-1718-w1.component';
import { TeamsComponent } from './teams/teams.component';

const ROUTES = [
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
    path: 'events/relic-recovery/1718-CASD-ELM1',
    component: Casd1718Elm1Component
  },
  {
    path: 'events/relic-recovery/1718-CASD-TLM1',
    component: Casd1718Tlm1Component
  },
  {
    path: 'events/relic-recovery/1718-CASD-GLM1',
    component: Casd1718Glm1Component
  },
  {
    path: 'events/relic-recovery/1718-CASD-DLM1',
    component: Casd1718Dlm1Component
  },
  {
    path: 'events/relic-recovery/1718-CASD-W1',
    component: Casd1718W1Component
  },
  {
    path: 'events/relic-recovery/:eventID',
    component: RelicRecoveryEventComponent
  },
  {
    path: 'teams/:teamNumber',
    component: TeamsComponent
  },
  {
    path: '',
    component: RelicRecoveryComponent
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
  { path: '**', component: PageNotFoundComponent }
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
    EuclidLeagueChampionshipComponent,
    GaussLeagueChampionshipComponent,
    SanDiegoRegionalChampionshipComponent,
    TuringLeagueChampionshipComponent,
    DescartesLeagueChampionshipComponent,
    VelocityVortexComponent,
    RelicRecoveryComponent,
    RelicRecoveryEventComponent,
    PageNotFoundComponent,
    Casd1718Tlm1Component,
    Casd1718Dlm1Component,
    Casd1718Glm1Component,
    Casd1718Elm1Component,
    Casd1718W1Component,
    TeamsComponent
  ],
  imports: [
    DataTablesModule,
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
