import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';

import { PassengerDisplayComponent } from './passenger-display/passenger-display.component';
import { AgentDisplayComponent } from './agent-display/agent-display.component';
import { AirlineTvDisplayComponent } from './airline-tv-display/airline-tv-display.component';


const appRoutes: Routes = [
  {
    path:'airlineTvDisplay',
    component: AirlineTvDisplayComponent
  },
  {
    path:'passengerDisplay/:recLoc',
    component: PassengerDisplayComponent
  },
  {
    path:'',
    redirectTo: 'passengerDisplay',
    pathMatch: 'full'
  },
  {
    path:'agentDisplay/:counterName',
    component: AgentDisplayComponent
  }
];


@NgModule({
  declarations: [
    AppComponent, PassengerDisplayComponent, AgentDisplayComponent, AirlineTvDisplayComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: false }),
    BrowserModule, HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
