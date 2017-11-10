import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EventsComponent } from './events/events.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';

import { InputScheduleComponent } from './input-schedule/input-schedule.component';
import { EuclidLeagueChampionshipComponent } from './euclid-league-championship/euclid-league-championship.component';
import { TurningLeagueChampionshipComponent } from './turning-league-championship/turning-league-championship.component';
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
    EuclidLeagueChampionshipComponent,
    TurningLeagueChampionshipComponent
  ],
  imports: [
    BrowserModule, 
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }