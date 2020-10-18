import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, share, distinctUntilChanged } from 'rxjs/operators';

import { AppSettings } from 'src/app/app-settings';
import { DataService } from '@app-services/core/data.service';
import { UploadFileList } from '../models/upload.model';

@Injectable()
export class UploadService extends DataService {

  // private url = `${AppSettings.route.endpoint}/${AppSettings.route.upload}`;
 private url = 'http://localhost:8080/apigw/api/v1/upload' ;

  constructor(
    http: HttpClient,
  ) {
    super(http);
  }

  uploadFiles(files: Set<File>): UploadFileList {
    const status: UploadFileList = {};

    files.forEach(file => {
      const progress: Observable<number | null> = this.uploadFile(file).pipe(
        map(this.calculateUploadProgress),
        distinctUntilChanged(),
      );

      status[file.name] = { progress };
    });

    return status;
  }

  uploadFile(file: File): Observable<HttpEvent<FormData>> {
    const formData: FormData = new FormData();
    formData.append('receiptFile', file, file.name);

    const httpRequest: HttpRequest<FormData> = new HttpRequest('POST', this.url, formData, {
      reportProgress: true,
    });

    return this.request(httpRequest).pipe(
      share(),
    );
  }

  private calculateUploadProgress(event: HttpEvent<FormData>): number {
    const calculate = (loaded: number, total: number) => Math.floor(100 * loaded / total);

    switch (event.type) {
      case HttpEventType.Sent:
        return 0;

      case HttpEventType.UploadProgress:
        const { loaded, total } = event;
        return calculate(loaded, total);

      case HttpEventType.Response:
        return 100;

      default:
        return null;
    }
  }

}
