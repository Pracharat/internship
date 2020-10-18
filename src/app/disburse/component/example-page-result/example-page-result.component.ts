import { Component, OnInit } from '@angular/core';

import { AppSettings } from 'src/app/app-settings';

import { PaginationParams } from '@app-models/common/pagination.model';

@Component({
  selector: 'app-example-page-result',
  templateUrl: './example-page-result.component.html',
  styleUrls: ['./example-page-result.component.scss']
})
export class ExamplePageResultComponent implements OnInit {

  total = 50;
  pageParams: PaginationParams = AppSettings.pagination;
  get totalPage(): number {
    const { limit } = this.pageParams;
    return Math.ceil(this.total / limit);
  }

  constructor() { }

  ngOnInit() {
  }

  previous() {
    const { page } = this.pageParams;
    this.pageParams.page = page <= 1 ? 1 : page - 1;
  }

  next() {
    const { page } = this.pageParams;
    this.pageParams.page = page >= this.totalPage ? this.totalPage : page + 1;
  }

}
