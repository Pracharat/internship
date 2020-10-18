import { Injectable, OnInit } from '@angular/core';
import { DataService } from '../core/data.service';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Reimbursetoice, Employee } from '@app-models/disburse/reimburseToeic.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { element } from 'protractor';
import { map } from 'rxjs/operators';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { UpdateFormDialogComponent } from '@app-dialog/components/update-form-dialog/update-form-dialog.component';
import { PaginationParams } from '@app-models/common/pagination.model';

@Injectable({
  providedIn: 'root'
})
export class DisburseService extends DataService {
  selectedEmployee: any[];
  form: FormGroup;
  constructor(
    public http: HttpClient,
    // public httpRequest: HttpRequest<File>

  ) {
    super(http);
  }
  addReimbursement(url, resource) {
    return this.post<AppResponse>(url, resource).pipe(
      map(response => response.resultData as Reimbursetoice[]),
    );
  }
  uploadFile(url, File) {
    return this.post<AppResponse>(url, File).pipe(
      map(res => res.resultData as File)
    );
  }
  getEligible(url, pageParam?: PaginationParams) {
    return this.get<AppResponse>(url, pageParam as any).pipe(
      map(response => response.resultData.items as Reimbursetoice[]
      ),
    );
  }
  getTotal(url) {
    return this.get<AppResponse>(url).pipe(
      map(response => response.resultData.total)
    )
  }
  getEmployeelist(url) {
    return this.get<AppResponse>(url).pipe(
      map(response => response.resultData as Employee[]),
    );
  }
  getEmployee(url, id: string) {
    return this.get<AppResponse>(`${url}?_id=${id}`).pipe(
      map(response => response.resultData as Employee)
    );
  }

  deleteEligible(url, id) {
    const dataParam = `${url}?_id=${id}`;
    return this.delete(dataParam);
  }
  update(url, id, resource) {
    const dataParam = `${url}?_id=${id}`;
    return this.patch(dataParam, resource);
  }

}

interface AppResponse {
  resultCode?: string;
  resultData?: any;
}
