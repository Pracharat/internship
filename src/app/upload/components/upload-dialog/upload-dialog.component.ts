import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, forkJoin, Subject, combineLatest, of } from 'rxjs';
import { takeUntil, map, filter, catchError } from 'rxjs/operators';

import { DialogComponent } from '@app-dialog/components/dialog/dialog.component';
import { UploadFileList } from '../../models/upload.model';
import { UploadService } from '../../services/upload.service';
// import { UploadService } from '@app-upload/services/upload.service';

// import { UploadFileList } from '@app-upload/models/upload.model';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.scss']
})
export class UploadDialogComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();

  @ViewChild('file', { static: false }) file: ElementRef;
  files: Set<File> = new Set();

  get totalFiles(): number {
    return this.files.size;
  }

  uploadFileList: UploadFileList;
  isUploading = false;
  isUploadSuccess = false;
  isUploadFail = false;

  uploadProgressList$: Observable<number[]>;
  totalProgress$: Observable<number>;
  uploadFinish$: Observable<boolean>;

  get inputFile(): HTMLInputElement {
    return this.file.nativeElement;
  }

  get listCssClass(): { [key: string]: any } {
    return {
      loading: this.isUploading,
      success: this.isUploadSuccess,
      fail: this.isUploadFail,
    };
  }

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    public uploadService: UploadService,
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onClickAddFiles() {
    this.inputFile.click();
  }

  onDeleteFile(file: File) {
    this.files.delete(file);
  }

  addFiles() {
    const files: FileList = this.inputFile.files;
    for (const key in files) {
      if (!isNaN(parseInt(key, 10))) {
        this.files.add(files[key] as File);
      }
    }
  }

  upload() {
    this.isUploading = true;
    this.isUploadSuccess = false;
    this.isUploadFail = false;

    this.uploadFileList = this.uploadService.uploadFiles(this.files);
    this.setupAllEvents();
  }

  closeDialog() {
    this.dialogRef.close(this.files);
  }

  private setupAllEvents() {
    this.uploadProgressList$ = this.getAllUploadProgress();

    this.totalProgress$ = this.uploadProgressList$.pipe(
      map(progressList => {
        const loaded: number = progressList.reduce((prev, current) => {
          return prev + current;
        }, 0);
        const total = progressList.length * 100;
        return Math.round(100 * loaded / total);
      }),
    );

    this.uploadFinish$ = this.getUploadFinishEvent();

    this.uploadFinish$.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(
      () => {
        this.isUploadSuccess = true;
        this.isUploading = false;
      },
      err => {
        console.log(err);
        this.isUploading = false;
        this.isUploadFail = true;
      },
    );
  }

  private getAllUploadProgress(): Observable<number[]> {
    const progressList: Observable<number>[] = [];

    for (const key in this.uploadFileList) {
      if (this.uploadFileList[key]) {
        const progress: Observable<number> = this.uploadFileList[key].progress;
        progressList.push(progress);
      }
    }

    return combineLatest(progressList);
  }

  private getUploadFinishEvent() {
    const progressList: Observable<number>[] = [];

    for (const key in this.uploadFileList) {
      if (this.uploadFileList[key]) {
        const progress: Observable<number> = this.uploadFileList[key].progress;
        progressList.push(progress);
      }
    }

    return forkJoin(progressList).pipe(
      takeUntil(this.unsubscribe$),
      map(() => true),
    );
  }
  

}
