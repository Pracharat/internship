import { Injectable } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';

import { environment } from 'src/environments/environment';
import { PaginationParams, PaginationOrder } from './models/common/pagination.model';
import { LabelValue } from './models/common/label-value.model';
import { ScreenBreakpoint } from './models/common/screen.model';

// import { LabelValue } from '@app-models/common/label-value.model';
// import { PaginationParams, PaginationOrder } from '@app-models/common/pagination.model';
// import { ScreenBreakpoint } from '@app-models/common/screen.model';

@Injectable()
export class AppSettings {

  static route = {
    endpoint: environment.endpoint,
    upload: 'apigw/api/v1/toeic_detail/image',
  };

  static languages: LabelValue[] = [
    { label: 'EN', value: 'en' },
    { label: 'TH', value: 'th' },
  ];
  static defaultLanguage = 'en';

  static inputMaxLength = 100;

  static pagination: PaginationParams = {
    page: 1,
    limit: 5,
    order: PaginationOrder.Ascending,
  };
  static paginationSettings = {
    boundaryLinks: false,
    directionLinks: true,
    maxPageSize: 3,
    boundaryPages: true,
  };
  static itemPerPageOptions: number[] = [5, 10, 15];

  static noImage = '/assets/images/icons/ic-no-image.svg';

  static dialogConfig: MatDialogConfig = {
    panelClass: 'app-dialog',
    maxHeight: 'calc(100vh - 32px)',
    width: 'calc(100% - 32px)',
    maxWidth: '640px',
  };

  static dateFormat = 'dd/MM/yyyy';

  static displayMenuButton: ScreenBreakpoint = {
    xSmall: true,
    small: true,
    medium: false,
    large: false,
    xLarge: false,
    xxLarge: false,
  };
  static screenChangeDebounceTime = 200;
  static hideMenuOnRoutes = ['/404', '/login'];

  static idle = {
    sensitivity: 1000,
    timeout: 1000 * 60 * 5,
  };
  static alertDialogConfig: MatDialogConfig = {
    panelClass: ['app-dialog', 'alert-dialog'],
    maxWidth: '400px',
  };
  static confirmDialogConfig: MatDialogConfig = {
    panelClass: ['app-dialog', 'confirm-dialog'],
    maxWidth: '400px',
  };

}
