import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Employee } from '@app-models/disburse/reimburseToeic.model';
import { fileValidator } from 'src/app/validators/file.validator';
import { DisburseService } from '@app-services/disburse/disburse.service';

@Component({
  selector: 'app-update-form-dialog',
  templateUrl: './update-form-dialog.component.html',
  styleUrls: ['./update-form-dialog.component.scss']
})
export class UpdateFormDialogComponent implements OnInit {

  form: FormGroup;
  private url = 'http://localhost:8080/apigw/api/v1/toeic_detail';
  private urlFile = 'http://localhost:8080/apigw/api/v1/upload';
  minDate = new Date();
  currentDate = new Date();
  file: File;
  
  get date() {
    return this.form.get('receiptDate');
  }
  get amountWithdrawn() {
    return this.form.get('amountWithdrawn');
  }
  get receiptAmount() {
    return this.form.get('receiptAmount');
  }
  get receiptFile() {
    return this.form.get('receiptFile');
  }
  get employee() {
    return this.form.get('employee');
  }
  get remark() { 
    return this.form.get('remark');
  }

  constructor(
    private dialogRef: MatDialogRef<UpdateFormDialogComponent, any>,
    public http: HttpClient,
    private fb: FormBuilder,
    private disburseService: DisburseService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.initForm(this.data);
    this.minDate.setDate(this.minDate.getDate() - 60);
  }


  private initForm(emp) {
    this.form = this.fb.group({
      employee: [null, [Validators.required]],
      receiptNo: ['', [Validators.required, Validators.pattern(/^\(\d{3}\)\s\d{3}-\d{4}-|\d{2}/)]],
      receiptAmount: ['0', [Validators.required, Validators.max(100000)]],
      receiptDate: ['', [Validators.required]],
      amountWithdrawn: '0.2-2',
      receiptFile: ['', [Validators.required, fileValidator]],
      remark: ['', [Validators.maxLength(1500)]],
    });
    this.form.patchValue(emp);
  }
  update() {
    this.dialogRef.close(this.form.value);
  }

  amountWithDrawn() {
    if (this.receiptAmount.value < 900) {
      this.amountWithdrawn.patchValue(this.receiptAmount.value);
    } else {
      this.amountWithdrawn.setValue(900);
    }
  }
  cancelUpdate() {
    this.dialogRef.close();
  }
  displayEmployeeOption(value: Employee): string {
    return value ? `${value.firstname} ${value.lastname}` : '';
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
  }

}

