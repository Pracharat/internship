import { Component, OnInit } from '@angular/core';
import { ListViewMode } from 'src/app/models/common/list-view.model';
import { MockData } from '../../models/mock-data.model';
import { MockDataService } from '../../services/mock-data.service';

// import { MockDataService } from '../../services/mock-data.service';

// import { ListViewMode } from '@app-models/common/list-view.model';
// import { MockData } from '../../models/mock-data.model';

@Component({
  selector: 'app-example-list-view-switcher',
  templateUrl: './example-list-view-switcher.component.html',
  styleUrls: ['./example-list-view-switcher.component.scss']
})
export class ExampleListViewSwitcherComponent implements OnInit {

  view: ListViewMode = ListViewMode.Grid;
  get viewModeText(): string {
    switch (this.view) {
      case ListViewMode.Grid:
        return 'Grid';
      case ListViewMode.Table:
        return 'Table';
      default:
        return 'Unknown';
    }
  }

  get listCssClass(): string {
    switch (this.view) {
      case ListViewMode.Table:
        return 'table';
      case ListViewMode.Grid:
      default:
        return 'grid';
    }
  }

  dataList: MockData[] = [];

  constructor(
    private mockDataService: MockDataService,
  ) { }

  ngOnInit() {
    this.mockDataService.getMockData(12).subscribe(
      data => this.dataList = data,
      err => console.error(err),
    );
  }

}
