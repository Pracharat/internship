import { Component, OnInit, Input } from '@angular/core';

import { MockData } from '../../models/mock-data.model';

@Component({
  selector: 'app-example-data-list',
  templateUrl: './example-data-list.component.html',
  styleUrls: ['./example-data-list.component.scss']
})
export class ExampleDataListComponent implements OnInit {

  @Input() list: MockData[] = [];

  constructor() { }

  ngOnInit() {
  }

}
