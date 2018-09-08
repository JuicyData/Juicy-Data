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
import { FormsModule } from '@angular/forms';

const ROUTES = [
  // {
  //   path: 'upload',
  //   loadChildren: 'app/upload/upload.module#UploadModule'
  // },
  {
    path: 'blog',
    loadChildren: 'app/blog/blog.module#BlogModule'
  },
  {
    path: 'blog/decision-making',
    loadChildren: 'app/blog/posts/decision-making/decision-making.module#DecisionMakingModule'
  },
  {
    path: 'blog/tetrix-vs-vexpro-the-facts',
    loadChildren: 'app/blog/posts/tetrix-vs-vexpro-the-facts/tetrix-vs-vexpro-the-facts.module#TetrixVsVexproTheFactsModule'
  },
  {
    path: 'blog/a-few-tips-to-bring-your-driving-game-to-the-next-level',
    loadChildren: 'app/blog/posts/a-few-tips-to-bring-your-driving-game-to-the-next-level/a-few-tips-to-bring-your-driving-game-to-the-next-level.module#AFewTipsToBringYourDrivingGameToTheNextLevelModule'
  },
  {
    path: 'blog/6-tips-to-improve-your-ftc-teams-engineering-notebook',
    loadChildren: 'app/blog/posts/seven-tips-to-improve-your-ftc-teams-engineering-notebook/seven-tips-to-improve-your-ftc-teams-engineering-notebook.module#SevenTipsToImproveYourFtcTeamsEngineeringNotebookModule'
  },
  {
    path: 'about',
    loadChildren: 'app/about/about.module#AboutModule'
  },
  {
    path: 'blog/create',
    loadChildren: 'app/blog-create/blog-create.module#BlogCreateModule'
  },
  {
    path: 'forgot-password',
    loadChildren: 'app/forgot-password/forgot-password.module#ForgotPasswordModule'
  },
  {
    path: 'email-verification/verify/:data',
    loadChildren: 'app/email-verification/email-verification.module#EmailVerificationModule'
  },
  {
    path: 'sign-in',
    loadChildren: 'app/sign-in/sign-in.module#SignInModule'
  },
  {
    path: 'sign-up',
    loadChildren: 'app/sign-up/sign-up.module#SignUpModule'
  },
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
    DataTablesModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
