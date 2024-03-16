import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InformationPageComponent } from './Home/information-page/information-page.component';
import { MainPageComponent } from './Home/main-page/main-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCommonModule} from '@angular/material/core';
import {MatChipsModule} from '@angular/material/chips';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';



@NgModule({
  declarations: [
    AppComponent,
    InformationPageComponent,
    MainPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCommonModule,
    MatChipsModule,
    MatGridListModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    NgxYoutubePlayerModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
