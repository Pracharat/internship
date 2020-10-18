import { Directive, Output, EventEmitter, OnDestroy, HostListener } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

// import { UploadDialogComponent } from '@app-upload/components/upload-dialog/upload-dialog.component';

import { AppSettings } from 'src/app/app-settings';
import { UploadDialogComponent } from '../components/upload-dialog/upload-dialog.component';

@Directive({
  selector: '[appUploadButton]'
})
export class UploadButtonDirective implements OnDestroy {

  private unsubscribe$ = new Subject();

  @Output() openDialog = new EventEmitter<MatDialogRef<UploadDialogComponent, any>>();
  @Output() closeDialog = new EventEmitter<Set<File>>();

  private dialogRef: MatDialogRef<UploadDialogComponent, any>;

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  @HostListener('click')
  openUploadDialog() {
    const dialogConfig: MatDialogConfig = {
      ...AppSettings.dialogConfig,
      panelClass: 'upload-dialog',
      disableClose: true,
    };
    this.dialogRef = this.dialog.open(UploadDialogComponent, dialogConfig);
    this.openDialog.emit(this.dialogRef);

    this.dialogRef.afterClosed().pipe(
      takeUntil(this.unsubscribe$),
      take(1),
    ).subscribe(data => {
      this.closeDialog.emit(data);
    });
  }

}
