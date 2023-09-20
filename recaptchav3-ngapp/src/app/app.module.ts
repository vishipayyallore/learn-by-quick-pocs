import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLinkWithHref } from '@angular/router';

import { FooterComponent } from '../app/core/layout/footer/footer.component';
import { HeaderComponent } from '../app/core/layout/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RecaptchaV3Module,
    AppRoutingModule,
    CommonModule,
    RouterLinkWithHref,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  exports: [
  ],
  providers: [
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.recaptcha.siteKey,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
