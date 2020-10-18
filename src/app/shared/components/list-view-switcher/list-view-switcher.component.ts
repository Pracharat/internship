import { Component, OnInit, Output, EventEmitter, forwardRef } from '@angular/core';

import { ListViewMode } from '@app-models/common/list-view.model';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UtilityService } from '@app-services/common/utility.service';

@Component({
  selector: 'app-list-view-switcher',
  templateUrl: './list-view-switcher.component.html',
  styleUrls: ['./list-view-switcher.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ListViewSwitcherComponent),
      multi: true,
    },
  ],
})
export class ListViewSwitcherComponent implements OnInit, ControlValueAccessor {

  @Output() toggleChange = new EventEmitter<ListViewMode>();

  isDisabled = false;

  mode: ListViewMode = ListViewMode.Grid;
  get gridView(): ListViewMode {
    return ListViewMode.Grid;
  }
  get tableView(): ListViewMode {
    return ListViewMode.Table;
  }

  constructor() { }

  ngOnInit() {
  }

  onChangeViewMode(event) {
    this.writeValue(this.mode);
    this.toggleChange.emit(this.mode);
  }

  onChange = (value: ListViewMode) => {};
  onTouched = () => {};
  registerOnChange(fn: any) {
    this.onChange = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
  writeValue(value: ListViewMode) {
    if (UtilityService.isNullOrUndefined(value)) {
      this.mode = null;
    } else {
      this.mode = value;
    }

    this.onChange(value);
  }
  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

}
