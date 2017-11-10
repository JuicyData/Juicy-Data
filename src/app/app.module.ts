import { DataTablesModule } from 'angular-datatables';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EventsComponent } from './events/events.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';

import { InputScheduleComponent } from './input-schedule/input-schedule.component';
<<<<<<< HEAD
import { EuclidLeagueChampionshipComponent } from './euclid-league-championship/euclid-league-championship.component';
import { TurningLeagueChampionshipComponent } from './turning-league-championship/turning-league-championship.component';
=======
import { GaussLeagueChampionshipComponent } from './gauss-league-championship/gauss-league-championship.component';
import { SanDiegoRegionalChampionshipComponent } from './san-diego-regional-championship/san-diego-regional-championship.component';
import { TuringLeagueChampionshipComponent } from './turing-league-championship/turing-league-championship.component';
>>>>>>> 3cc1193cc8f4b833a90c3a02d77cd368a4f5e2fb
const ROUTES = [
  {
    path: "events/velocity-vortex", 
    component: EventsComponent
  },
  // { 
  //   path: "input-data", 
  //   component: InputDataComponent
  // },
  { 
    path: "events", 
    component: EventsComponent
  },
  { 
    path: "", 
    component: HomeComponent
  },
  { 
    path: "events/velocity-vortex/gauss-league-championship", 
    component: GaussLeagueChampionshipComponent
  },
  {
    path: "events/velocity-vortex/san-diego-regional-championship",
    component: SanDiegoRegionalChampionshipComponent
  },
  {
    path: "events/velocity-vortex/turing-league-championship",
    component: TuringLeagueChampionshipComponent
  }


]
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    EventsComponent,
    HomeComponent,
    InputScheduleComponent,
    HomeComponent,
<<<<<<< HEAD
    EuclidLeagueChampionshipComponent,
    TurningLeagueChampionshipComponent
=======
    GaussLeagueChampionshipComponent,
    SanDiegoRegionalChampionshipComponent,
    TuringLeagueChampionshipComponent
>>>>>>> 3cc1193cc8f4b833a90c3a02d77cd368a4f5e2fb
  ],
  imports: [
    DataTablesModule,
    BrowserModule, 
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }