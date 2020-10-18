import {
  Component,
  OnInit,
  Input, ChangeDetectionStrategy,
} from '@angular/core';

import { AppSettings } from 'src/app/app-settings';

@Component({
  selector: 'app-page-result',
  templateUrl: './page-result.component.html',
  styleUrls: ['./page-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageResultComponent implements OnInit {

  @Input() total = 0;
  @Input() page = 1;
  @Input() limit: number = AppSettings.pagination.limit;

  get start(): number {
    return ((this.page - 1) * this.limit) + 1;
  }
  get end(): number {
    const end = this.page * this.limit;
    return end > this.total ? this.total : end;
  }

  constructor() { }

  ngOnInit() {
  }

}
