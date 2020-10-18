import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { DialogComponent } from './components/dialog/dialog.component';
// import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';
// import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { DialogService } from '@app-services/common/dialog.service';
import { UpdateFormDialogComponent } from './components/update-form-dialog/update-form-dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '@app-material/angular-material.module';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component';
import { SharedModule } from '@app-shared/shared.module';
import { UploadModule } from '../upload/upload.module';


@NgModule({
  declarations: [
    AlertDialogComponent,
    UpdateFormDialogComponent,
    ConfirmDialogComponent,
    DialogComponent
  ],
  entryComponents: [
    ConfirmDialogComponent,
    UpdateFormDialogComponent,
    AlertDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule,
    SharedModule,
    UploadModule
  ],
  providers: [
    DialogService,
  ],
})
export class DialogModule { }
