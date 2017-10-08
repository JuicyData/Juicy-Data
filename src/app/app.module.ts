import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EventsComponent } from './events/events.component';
import { HomeComponent } from './home/home.component';
import { InputScheduleComponent } from './input-schedule/input-schedule.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EventsComponent,
    HomeComponent,
    InputScheduleComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }