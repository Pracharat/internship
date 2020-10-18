import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

import { DialogParams, DialogButtons } from '@app-dialog/models/dialog.model';

@Component({
  selector: 'app-dialog',
  template: ``,
  styles: []
})
export class DialogComponent {

  get title(): string {
    return this.data ? this.data.title : null;
  }
  get content(): string {
    return this.data ? this.data.content : null;
  }
  get buttons(): DialogButtons {
    return this.data ? this.data.buttons : null;
  }
  get closeText(): string {
    const hasText: boolean = !!this.buttons && !!this.buttons.closeText;
    return hasText ? this.buttons.closeText : this.getTranslateText('DIALOG.BUTTONS.CLOSE');
  }
  get yesText(): string {
    const hasText: boolean = !!this.buttons && !!this.buttons.yesText;
    return hasText ? this.buttons.yesText : this.getTranslateText('DIALOG.BUTTONS.YES');
  }
  get noText(): string {
    const hasText: boolean = !!this.buttons && !!this.buttons.noText;
    return hasText ? this.buttons.noText : this.getTranslateText('DIALOG.BUTTONS.NO');
  }

  constructor(
    protected dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) protected data: DialogParams,
    protected translate: TranslateService,
  ) { }

  private getTranslateText(name: string): string {
    return this.translate.instant(name);
  }

}
