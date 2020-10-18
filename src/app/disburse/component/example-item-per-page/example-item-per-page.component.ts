import { Component, OnInit } from '@angular/core';

import { AppSettings } from 'src/app/app-settings';

import { PaginationParams } from '@app-models/common/pagination.model';

@Component({
  selector: 'app-example-item-per-page',
  templateUrl: './example-item-per-page.component.html',
  styleUrls: ['./example-item-per-page.component.scss']
})
export class ExampleItemPerPageComponent implements OnInit {

  pageParams: PaginationParams = AppSettings.pagination;

  constructor() { }

  ngOnInit() {
  }

  onChangeLimit(limit: number) {
    const page = 1;
    this.pageParams = { ...this.pageParams, page, limit };
  }

}
