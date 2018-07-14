import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const ROUTES = [
  {
    path: 'events',
    loadChildren: 'app/events/relic-recovery/relic-recovery.module#RelicRecoveryModule'
  },
  {
    path: 'events/relic-recovery',
    redirectTo: '/events',
    pathMatch: 'full'
  },
  {
    path: 'events/relic-recovery/:eventID',
    loadChildren: 'app/events/relic-recovery/relic-recovery-event/relic-recovery-event.module#RelicRecoveryEventModule'
  },
  {
    path: 'events/FLL-CEF-SHOWCASE',
    loadChildren: 'app/fll/fll.module#FllModule'
  },
  {
    path: 'events/FLL-CEF-SHOWCASE/input',
    loadChildren: 'app/fll-input/fll-input.module#FllInputModule'
  },
  {
    path: 'events/FLL-CEF-SHOWCASE/view',
    loadChildren: 'app/fll-view/fll-view.module#FllViewModule'
  },
  {
    path: 'teams',
    loadChildren: 'app/teams/teams.module#TeamsModule'
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
    PageNotFoundComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
