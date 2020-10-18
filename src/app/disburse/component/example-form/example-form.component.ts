import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'src/app/services/core/data.service';


@Component({
  selector: 'app-example-form',
  templateUrl: './example-form.component.html',
  styleUrls: ['./example-form.component.scss']
})
export class ExampleFormComponent implements OnInit {

  form: FormGroup;
  result: Array<any>; 
  options: any[] = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' },
  ];

  constructor(
    private fb: FormBuilder,
    public http : HttpClient ,
    public dataService : DataService
  ) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.form = this.fb.group({
      pin: '',
      firstname: '',
      lastname: ''
      // email: ['', [Validators.required, Validators.email]],
    });
  }


}
