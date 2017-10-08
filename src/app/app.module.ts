import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
<<<<<<< HEAD
import { EventsComponent } from './events/events.component';
=======
import { HomeComponent } from './home/home.component';
>>>>>>> ef8b62a4b664468d30d133ba7deaa0c442a04e7f

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
<<<<<<< HEAD
    EventsComponent
=======
    HomeComponent
>>>>>>> ef8b62a4b664468d30d133ba7deaa0c442a04e7f
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
