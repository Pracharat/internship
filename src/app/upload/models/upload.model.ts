import { Observable } from 'rxjs';

export interface UploadFileList {
  [key: string]: UploadProgress;
}

export interface UploadProgress {
  progress: Observable<number>;
}
