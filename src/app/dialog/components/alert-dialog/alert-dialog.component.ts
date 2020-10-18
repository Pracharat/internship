import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

import { DialogComponent } from '../dialog/dialog.component';

import { DialogParams } from '@app-dialog/models/dialog.model';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: [
    '../../css/dialog.scss',
    './alert-dialog.component.scss',
  ],
})
export class AlertDialogComponent implements OnInit {

  constructor(
    // dialogRef: MatDialogRef<AlertDialogComponent, any>,
    // @Inject(MAT_DIALOG_DATA) data: DialogParams,
    // translate: TranslateService,
  ) {
    // super(dialogRef, data, translate);
  }

  ngOnInit() {
  }

}