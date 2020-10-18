import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-upload-progress-bar',
  templateUrl: './upload-progress-bar.component.html',
  styleUrls: ['./upload-progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadProgressBarComponent {

  @Input() value: number;

}
