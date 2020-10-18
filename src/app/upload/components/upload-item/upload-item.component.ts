import {
  Component,
  OnInit, OnChanges,
  Input, ChangeDetectionStrategy, ChangeDetectorRef, Output, EventEmitter,
} from '@angular/core';

// import { UploadProgress } from '@app-upload/models/upload.model';
import { UtilityService } from '@app-services/common/utility.service';
import { UploadProgress } from '../../models/upload.model';

@Component({
  selector: 'app-upload-item',
  templateUrl: './upload-item.component.html',
  styleUrls: ['./upload-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadItemComponent implements OnInit, OnChanges {

  @Output() delete = new EventEmitter<File>();

  @Input() file: File;
  get name(): string {
    return this.file.name;
  }

  // tslint:disable-next-line: no-input-rename
  @Input('progress') uploadProgress: UploadProgress;
  progress: number;

  isSuccess = false;
  isFail = false;
  previewUrl: any = null;

  get showProgress(): boolean {
    return !UtilityService.isNullOrUndefined(this.progress) &&  this.progress >= 0 && this.progress < 100;
  }

  get uploadStateIcon(): string {
    if (this.isFail) {
      return 'exclamation-triangle';
    }

    if (this.isSuccess) {
      return 'check';
    }
  }

  constructor(
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (!this.file || !this.uploadProgress) {
      return;
    }

    this.uploadProgress.progress.subscribe(
      progress => {
        this.progress = progress;
        this.isSuccess = progress === 100;
        this.cdr.detectChanges();
      },
      err => {
        this.progress = null;
        this.isFail = true;
        this.cdr.detectChanges();
      },
    );

  }

  deleteFile() {
    this.delete.emit(this.file);
  }

  // preview() {
  //   // Show preview 
  //   const mimeType = this.file.type;
  //   if (mimeType.match(/image\/*/) == null) {
  //     return;
  //   }

  //   const reader = new FileReader();
  //   reader.readAsDataURL(this.file);
  //   reader.onload = (_event) => {
  //     this.previewUrl = reader.result;
  //     console.log('hey result');   
  //   };

  // }

}
