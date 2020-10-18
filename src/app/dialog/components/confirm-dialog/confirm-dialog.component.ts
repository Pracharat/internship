import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

import { DialogComponent } from '../dialog/dialog.component';

import { DialogParams } from '@app-dialog/models/dialog.model';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: [
    '../../css/dialog.scss',
    './confirm-dialog.component.scss',
  ],
})
export class ConfirmDialogComponent implements OnInit {

  constructor(
    // dialogRef: MatDialogRef<ConfirmDialogComponent, boolean>,
    // @Inject(MAT_DIALOG_DATA) data: DialogParams,
    // translate: TranslateService,
  ) {
    // super(dialogRef, data, translate);
  }

  ngOnInit() {
  }

}
