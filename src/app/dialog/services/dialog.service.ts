import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';

import { AlertDialogComponent } from '@app-dialog/components/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from '@app-dialog/components/confirm-dialog/confirm-dialog.component';

import { AppSettings } from 'src/app/app-settings';

import { DialogParams } from '@app-dialog/models/dialog.model';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private defaultDialogConfig: MatDialogConfig = AppSettings.dialogConfig;
  private alertDialogConfig: MatDialogConfig = AppSettings.alertDialogConfig;
  private confirmDialogConfig: MatDialogConfig = AppSettings.confirmDialogConfig;

  constructor(
    private dialog: MatDialog,
  ) { }

  alert(data: DialogParams) {
    const config: MatDialogConfig = {
      ...this.defaultDialogConfig,
      ...this.alertDialogConfig,
      data,
    };
    const dialogRef: MatDialogRef<AlertDialogComponent, boolean> = this.dialog
      .open<AlertDialogComponent, DialogParams, boolean>(AlertDialogComponent, config);
    return dialogRef;
  }

  confirm(data: DialogParams) {
    const config: MatDialogConfig = {
      ...this.defaultDialogConfig,
      ...this.confirmDialogConfig,
      data,
    };
    const dialogRef: MatDialogRef<ConfirmDialogComponent, boolean> = this.dialog
      .open<AlertDialogComponent, DialogParams, boolean>(ConfirmDialogComponent, config);
    return dialogRef;
  }

}
