import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-example-input-datepicker',
  templateUrl: './example-input-datepicker.component.html',
  styleUrls: ['./example-input-datepicker.component.scss']
})
export class ExampleInputDatepickerComponent implements OnInit {

  form: FormGroup;
  get date() {
    return this.form.get('date');
  }
  get allowKeyboardTyping() {
    return this.form.get('allowKeyboardTyping');
  }

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.form = this.fb.group({
      date: new Date(),
      allowKeyboardTyping: false,
    });
  }

}
