import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { takeUntil, startWith, map, filter, switchMap, mapTo, debounceTime, delay } from 'rxjs/operators';
import { DisburseService } from 'src/app/services/disburse/disburse.service';
import { Reimbursetoice, Employee, } from 'src/app/models/disburse/reimburseToeic.model';
import { MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';
import { UpdateFormDialogComponent } from '@app-dialog/components/update-form-dialog/update-form-dialog.component';
import { AppSettings } from 'src/app/app-settings';
import { SnackbarComponent } from '../snackbar/snackbar-save/snackbar.component';
import { Subject, Observable } from 'rxjs';
import { SnackbarUpdateComponent } from '../snackbar/snackbar-update/snackbar-update.component';
import { PaginationParams } from '@app-models/common/pagination.model';
import { AlertDialogComponent } from '@app-dialog/components/alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from '@app-dialog/components/confirm-dialog/confirm-dialog.component';
import { FileValidator } from 'ngx-material-file-input';
import { fileValidator } from 'src/app/validators/file.validator';
import { error } from 'util';






@Component({
  selector: 'app-reimbursement-toeic',
  templateUrl: './reimbursement-toeic.component.html',
  styleUrls: ['./reimbursement-toeic.component.scss'],
})
export class ReimbursementToeicComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();
  private url = 'http://localhost:8080/apigw/api/v1/toeic_detail';
  private urlFile = 'http://localhost:8080/apigw/api/v1/upload';
  private urlEmployee = 'http://localhost:8080/apigw/api/v1/employee';
  form: FormGroup;
  filteredOptions: Observable<any[]>;
  filteredTable: Reimbursetoice[];
  employeelist: Employee[] = [];
  reimburseToeic: Reimbursetoice[] = [];
  reimburseToeicId;
  displayedColumns: string[] = ['no', 'employee', 'fullAmount','receiptAmount', 'action'];
  pageParams: PaginationParams = AppSettings.pagination;
  total: number;
  file: File = null;
  fileUploadProgress: string = null;
  previewUrl: any = null;
  searchKey;
  amount;
  isActivateFile;
  readonly maxSize = 3145728;
  minDate = new Date();
  currentDate = new Date();

  get startIndex(): number {
    return ((this.pageParams.page - 1) * this.pageParams.limit) + 1;
  }
  get date() {
    return this.form.get('receiptDate');
  }
  get receiptAmount() {
    return this.form.get('receiptAmount');
  }
  get receiptNo() {
    return this.form.get('receiptNo');
  }
  get remark() {
    return this.form.get('remark');
  }
  get employee() {
    return this.form.get('employee');
  }
  get receiptFile() {
    return this.form.get('receiptFile');
  }
  get amountWithdrawn() {
    return this.form.get('amountWithdrawn');
  }
  get currentPageDataList(): any[] {
    const start = (this.pageParams.page - 1) * this.pageParams.limit;
    const end = this.pageParams.page * this.pageParams.limit;
    return this.reimburseToeic.slice(start, end);
  }

  constructor(
    // tslint:disable-next-line: no-shadowed-variable
    public disburseService: DisburseService,
    public http: HttpClient,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,

  ) { }

  private initForm() {
    this.form = this.fb.group({
      employee: [null, [Validators.required]],
      receiptNo: ['', [Validators.required, Validators.pattern(/^\(\d{3}\)\s\d{3}-\d{4}-|\d{2}/)]],
      receiptAmount: ['0', [Validators.required, Validators.max(100000)]],
      receiptDate: ['', [Validators.required]],
      amountWithdrawn: '0' ,
      receiptFile: ['', [Validators.required, fileValidator]],
      remark: ['', [Validators.maxLength(1500)]],
    });
  }

  ngOnInit() {
    this.initForm();
    this.getReimbursetoeic();
    this.getListemployee();
    this.amountWithDrawn();
    this.filteredOptions = this.form.get('employee').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.minDate.setDate(this.minDate.getDate() - 60);
    console.log(this.minDate.toString);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private _filter(value: string): any[] {
    const filterValue = value;
    return this.employeelist.filter(option => option.firstname
      .toLowerCase()
      .includes(filterValue));
  }

  searchClear() {
    this.searchKey = null;
    this.getReimbursetoeic();
  }

  amountWithDrawn() {
    if (this.receiptAmount.value < 900) {
      this.amountWithdrawn.patchValue(this.receiptAmount.value);
    } else {
      this.amountWithdrawn.setValue(900);
    }
  }

  applyFilter(searchKey: string) {
    console.log(searchKey);
    this.reimburseToeic = this.reimburseToeic.filter(option => option.employee.firstname.toLowerCase().includes(searchKey));
    if (searchKey === "" || null) {
      this.searchClear();
    }
  }

  reset() {
    this.form.reset();
    this.previewUrl = null ;
  }

  onCloseUploadDialog(fileSet: Set<File>) {
    const files = Array.from(fileSet);
    this.receiptFile.setValue(files);
  }

  saveReimbursetoeic() {
    if (this.form.invalid) {
      const dialogConfig: MatDialogConfig = {
        ...AppSettings.dialogConfig,
      };
      this.dialog.open(AlertDialogComponent);
    } else {
      this.disburseService.addReimbursement(this.url, this.form.value).pipe(
        takeUntil(this.unsubscribe$),
      ).subscribe(res => {
        console.log('save :', res);
        this.getReimbursetoeic();
        this.reset();
        this.snackbar.openFromComponent(SnackbarComponent, { duration: 1000 });
      });
    }
  }

  getReimbursetoeic() {
    this.disburseService.getEligible(this.url, this.pageParams).pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(res => {
      this.reimburseToeic = res;
      console.log('getAllToeic', this.reimburseToeic);
    });
    this.getTotal();
  }

  getListemployee() {
    this.disburseService.getEmployeelist(this.urlEmployee).pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(res => {
      console.log('employeelist: ', res);
      this.employeelist = res;
    });
  }

  getTotal() {
    this.disburseService.getTotal(this.url).pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(res => {
      this.total = res;
      console.log('total is ', this.total);
    });
  }

  editListemployee(editEmployee: Reimbursetoice) {
    const dialogConfig: MatDialogConfig = {
      ...AppSettings.dialogConfig,
      data: editEmployee,
    };
    const dialogRef = this.dialog.open(UpdateFormDialogComponent, dialogConfig);
    dialogRef.afterClosed().pipe(
      takeUntil(this.unsubscribe$),
      filter(data => !!data),
      switchMap(data => {
        return this.disburseService.update(this.url, editEmployee._id, data);
      })
    ).subscribe(res => {
      console.table(res);
      this.getReimbursetoeic();
      this.snackbar.openFromComponent(SnackbarUpdateComponent, { duration: 1000 });
    });
    console.log('data from table', editEmployee);
  }

  deleteListemployee(element) {
    console.log('deleteListemployee');
    this.disburseService.deleteEligible(this.url, element._id).pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(res => {
      console.log('deleted');
      this.getReimbursetoeic();
    });
  }

  displayEmployeeOption(value: Employee): string {
    // tslint:disable-next-line: no-unused-expression
    value ? console.log(value.firstname, value._id) : '';
    value ? this.reimburseToeicId = value._id : ' ';
    console.log('insteadId in reimburseToeicId : ', this.reimburseToeicId);
    return value ? `${value.firstname} ${value.lastname}` : '';
  }

  onChangePage(page: number) {
    this.pageParams = { ...this.pageParams, page };
    this.getReimbursetoeic();
  }

  onChangeLimit(limit: number) {
    const page = 1;
    this.pageParams = { ...this.pageParams, page, limit };
    this.getReimbursetoeic();
  }

  onFileChanges(event: Event) {
    const inputFile = (event.target as HTMLInputElement);
    console.log(event);
    if (inputFile && inputFile.files.length > 0) {
      this.file = inputFile.files.item(0);
      this.uploadFile();
    }
    this.file = null;
  }

  uploadFile() {
    const formData = new FormData();
    formData.append('receiptFile', this.file, this.file.name);
    this.disburseService.uploadFile(this.urlFile, formData).pipe(
    ).subscribe(
      res => {
        this.receiptFile.setValue(res);
        console.log('uploaded file');
      }
    );
    this.preview()
  }
  preview() {
    // Show preview 
    const mimeType = this.file.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = (_event) => {
      this.previewUrl = reader.result;
    };

  }
  imgDialog(){
    console.log("hey pic ");
    
  }

}

