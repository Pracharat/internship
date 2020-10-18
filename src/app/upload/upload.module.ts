import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from '@app-material/angular-material.module';
import { FaIconModule } from '@app-fa-icon/fa-icon.module';

import { UploadButtonDirective } from './directives/upload-button.directive';
import { UploadDialogComponent } from './components/upload-dialog/upload-dialog.component';
import { UploadItemComponent } from './components/upload-item/upload-item.component';
import { UploadProgressBarComponent } from './components/upload-progress-bar/upload-progress-bar.component';
import { UploadResultComponent } from './components/upload-result/upload-result.component';

import { UploadService } from './services/upload.service';

@NgModule({
  declarations: [
    UploadButtonDirective,
    UploadDialogComponent,
    UploadItemComponent,
    UploadProgressBarComponent,
    UploadResultComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FaIconModule,
  ],
  exports: [
    UploadButtonDirective,
  ],
  providers: [
    UploadService,
  ],
  entryComponents: [
    UploadDialogComponent,
  ],
})
export class UploadModule { }
