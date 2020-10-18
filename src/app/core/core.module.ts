import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, Optional, SkipSelf, ErrorHandler, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from '../app-routing.module';

import { MenuTreeModule } from '../menu-tree/menu-tree.module';

import { throwIfAlreadyLoaded } from './module-import-guard';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HeaderComponent } from './components/header/header.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';


import { HomeComponent } from './components/home/home.component';
import { MainLogoComponent } from './components/main-logo/main-logo.component';

import { registerLocaleData } from '@angular/common';
import localeTh from '@angular/common/locales/th';
import localeThExtra from '@angular/common/locales/extra/th';
import { LoginComponent } from './components/login/login.component';

import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { LanguageModule } from '../language/language.module';
import { FaIconModule } from '../fa-icon/fa-icon.module';
import { AppInterceptor } from '../services/core/app-interceptor.service';
import { AppErrorHandler } from './error/app-error-handler';
import { MatCheckboxModule } from '@angular/material/checkbox';
registerLocaleData(localeTh, 'th-TH', localeThExtra);

@NgModule({
  declarations: [
    PageNotFoundComponent,
    HeaderComponent,
    SideNavComponent,
    HomeComponent,
    MainLogoComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    AngularMaterialModule,
    LanguageModule,
    FaIconModule,
    MenuTreeModule,
    ReactiveFormsModule,
    MenuTreeModule,
    MatCheckboxModule,
  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularMaterialModule,
    HeaderComponent,
    SideNavComponent,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'th-TH',
    },
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler,
    },
  ],
})
export class CoreModule {
  constructor(
    @Optional() @SkipSelf() parentModule: CoreModule,
  ) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
