import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { AlertDialogComponent } from '@app-dialog/components/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from '@app-dialog/components/confirm-dialog/confirm-dialog.component';

import { AppSettings } from 'src/app/app-settings';

import { DialogParams } from '@app-models/common/dialog.model';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private defaultDialogConfig: MatDialogConfig = AppSettings.dialogConfig;

  constructor(
    public dialog: MatDialog,
  ) { }

  alert(data: DialogParams) {
    const config: MatDialogConfig = {
      ...this.defaultDialogConfig,
      data,
    };
    const dialogRef = this.dialog.open(AlertDialogComponent, config);
    return dialogRef;
  }

  confirm(data: DialogParams) {
    const config: MatDialogConfig = {
      ...this.defaultDialogConfig,
      data,
    };
    const dialogRef = this.dialog.open(ConfirmDialogComponent, config);
    return dialogRef;
  }

}
