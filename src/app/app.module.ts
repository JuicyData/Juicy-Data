import { RouterModule } from '@angular/router';
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const ROUTES = [
  {
    path: 'blog',
    loadChildren: 'app/blog/blog.module#BlogModule'
  },
  // {
  //   path: 'sd-league-registration',
  //   loadChildren: 'app/sd-league-registration/sd-league-registration.module#SdLeagueRegistrationModule'
  // },
  // {
  //   path: 'sd-league-registration/:jwt',
  //   loadChildren: 'app/sd-league-registration/sd-league-registration.module#SdLeagueRegistrationModule'
  // },
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
  // {
  //   path: 'upload',
  //   loadChildren: 'app/upload/upload.module#UploadModule'
  // },
  // {
  //   path: 'event-admin',
  //   loadChildren: 'app/ftc/regions/events/event-admin/event-admin.module#EventAdminModule'
  // },
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
    path: 'ftc/regions/san-diego/teams',
    loadChildren: 'app/ftc/regions/team-list/team-list.module#TeamListModule'
  },
  {
    path: 'events/:eventID',
    loadChildren: 'app/ftc/regions/events/rover-ruckus/rover-ruckus.module#RoverRuckusModule'
  },
  {
    path: 'ftc/regions/san-diego',
    loadChildren: 'app/ftc/regions/region.module#RegionModule'
  },
  {
    path: 'link/:link',
    loadChildren: 'app/link/link.module#LinkModule'
  },
  {
    path: '',
    loadChildren: 'app/ftc/regions/region.module#RegionModule'
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
    RouterModule.forRoot(ROUTES, {scrollPositionRestoration: 'enabled'}),
    HttpClientModule,
    FormsModule
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule {}
