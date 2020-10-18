import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdleTimeoutService } from './services/idle-timeout.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    IdleTimeoutService,
  ],
})
export class IdleTimeoutModule { }
