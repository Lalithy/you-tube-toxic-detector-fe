import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InformationPageComponent } from './Home/information-page/information-page.component';
import { MainPageComponent } from './Home/main-page/main-page.component';

@NgModule({
  declarations: [
    AppComponent,
    InformationPageComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
