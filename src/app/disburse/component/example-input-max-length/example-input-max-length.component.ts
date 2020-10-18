import { Component, OnInit } from '@angular/core';
import { AppSettings } from 'src/app/app-settings';

@Component({
  selector: 'app-example-input-max-length',
  templateUrl: './example-input-max-length.component.html',
  styleUrls: ['./example-input-max-length.component.scss']
})
export class ExampleInputMaxLengthComponent implements OnInit {

  defaultMaxLength = AppSettings.inputMaxLength;
  specificMaxLength = 10;

  input1 = '';
  input2 = '';

  constructor() { }

  ngOnInit() {
  }

}
