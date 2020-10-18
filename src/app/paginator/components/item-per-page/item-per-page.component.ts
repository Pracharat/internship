import {
  Component,
  Input, Output, EventEmitter, ChangeDetectionStrategy,
} from '@angular/core';

import { AppSettings } from 'src/app/app-settings';

@Component({
  selector: 'app-item-per-page',
  templateUrl: './item-per-page.component.html',
  styleUrls: ['./item-per-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemPerPageComponent {

  @Output() limitChange = new EventEmitter<number>();

  @Input() limit: number = AppSettings.pagination.limit;

  itemPerPageList = AppSettings.itemPerPageOptions;

  onItemPerPageChange() {
    this.limitChange.emit(this.limit);
  }

}
