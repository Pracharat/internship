import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { UtilityService } from '@app-services/common/utility.service';

@Component({
  selector: 'app-upload-result',
  templateUrl: './upload-result.component.html',
  styleUrls: ['./upload-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadResultComponent {

  @Input('success') isSuccess: boolean;
  get isNullOrUndefined(): boolean {
    return UtilityService.isNullOrUndefined(this.isSuccess);
  }
  get icon(): string {
    return this.isSuccess ? 'check' : 'exclamation-triangle';
  }

}
