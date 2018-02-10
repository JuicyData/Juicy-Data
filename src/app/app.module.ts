import { DataTablesModule } from 'angular-datatables';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RelicRecoveryComponent } from './events/relic-recovery/relic-recovery.component';
import { RelicRecoveryEventComponent } from './events/relic-recovery/relic-recovery-event/relic-recovery-event.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TeamsComponent } from './teams/teams.component';

const ROUTES = [
  {
    path: 'events',
    component: RelicRecoveryComponent
  },
  {
    path: 'events/relic-recovery',
    component: RelicRecoveryComponent
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
    component: HomeComponent
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    RelicRecoveryComponent,
    RelicRecoveryEventComponent,
    PageNotFoundComponent,
    TeamsComponent,
    HomeComponent
  ],
  imports: [
    DataTablesModule,
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
