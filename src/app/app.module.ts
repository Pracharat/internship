import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisburseComponent } from './disburse/disburse.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { PaginatorModule } from './paginator/paginator.module';
import { FaIconModule } from './fa-icon/fa-icon.module';
import { RemarkDirective } from './shared/directives/remark.directive';

@NgModule({
  declarations: [
    AppComponent,
    DisburseComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    SharedModule,
    PaginatorModule,
    FaIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
