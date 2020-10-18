import { Component, OnInit, Input } from '@angular/core';

import { AppSettings } from 'src/app/app-settings';
import { PaginationParams } from 'src/app/models/common/pagination.model';
import { MockData } from '../../models/mock-data.model';
import { MockDataService } from '../../services/mock-data.service';

// import { PaginationParams } from '@app-models/common/pagination.model';
// import { MockData } from '../../models/mock-data.model';
// import { MockDataService } from '../../services/mock-data.service';

@Component({
  selector: 'app-example-paginator',
  templateUrl: './example-paginator.component.html',
  styleUrls: ['./example-paginator.component.scss']
})
export class ExamplePaginatorComponent implements OnInit {

  example: PaginationParams = AppSettings.pagination;
  exampleTotal = 100;
  maxPageSize: number = AppSettings.paginationSettings.maxPageSize;
  boundaryLinks: boolean = AppSettings.paginationSettings.boundaryLinks;
  directionLinks: boolean = AppSettings.paginationSettings.directionLinks;
  boundaryPages: boolean = AppSettings.paginationSettings.boundaryPages;

  total = 1000;
  pageParams: PaginationParams = AppSettings.pagination;
  private dataList: MockData[] = [];

  get currentPageDataList(): MockData[] {
    const start = (this.pageParams.page - 1) * this.pageParams.limit;
    const end = this.pageParams.page * this.pageParams.limit;
    return this.dataList.slice(start, end);
  }

  constructor(
    private mockDataService: MockDataService,
  ) { }

  ngOnInit() {
    this.mockDataService.getMockData(this.total).pipe().subscribe(
      data => this.dataList = data,
      err => console.error(err),
    );
  }

  onChangeExamplePage(page: number) {
    this.example = { ...this.example, page };
  }

  onChangePage(page: number) {
    this.pageParams = { ...this.pageParams, page };
  }

  onChangeLimit(limit: number) {
    const page = 1;
    this.pageParams = { ...this.pageParams, page, limit };
  }

}
