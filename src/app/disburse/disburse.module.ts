import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisburseRoutingModule } from './disburse-routing.module';
import { ReimbursementToeicComponent } from './component/reimbursement-toeic/reimbursement-toeic.component';
import { ExampleFormComponent } from './component/example-form/example-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ExamplePaginatorComponent } from './component/example-paginator/example-paginator.component';
import { ExampleListViewSwitcherComponent } from './component/example-list-view-switcher/example-list-view-switcher.component';
import { ExampleDataListComponent } from './component/example-data-list/example-data-list.component';
import { ExampleInputDatepickerComponent } from './component/example-input-datepicker/example-input-datepicker.component';
import { ExampleInputNumberComponent } from './component/example-input-number/example-input-number.component';
import { ExampleInputMaxLengthComponent } from './component/example-input-max-length/example-input-max-length.component';
import { ExampleInputTrimComponent } from './component/example-input-trim/example-input-trim.component';
import { ExampleLoaderComponent } from './component/example-loader/example-loader.component';
import { ExampleScrollServiceComponent } from './component/example-scroll-service/example-scroll-service.component';
import { ExampleNoDataComponent } from './component/example-no-data/example-no-data.component';
import { ExampleItemPerPageComponent } from './component/example-item-per-page/example-item-per-page.component';
import { ExamplePageResultComponent } from './component/example-page-result/example-page-result.component';
import { SharedModule } from '../shared/shared.module';
import { PaginatorModule } from '../paginator/paginator.module';
import { FaIconModule } from '../fa-icon/fa-icon.module';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../services/core/data.service';
import { UploadModule } from '../upload/upload.module';

import { DialogModule } from '@app-dialog/dialog.module';
import { UpdateFormDialogComponent } from '@app-dialog/components/update-form-dialog/update-form-dialog.component';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarComponent } from './component/snackbar/snackbar-save/snackbar.component';
import { SnackbarUpdateComponent } from './component/snackbar/snackbar-update/snackbar-update.component';
import { EligiblePersonComponent } from './component/eligible-person/eligible-person.component';
import { SettingComponent } from './component/setting/setting.component';
import { ReportsComponent } from './component/reports/reports.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';


@NgModule({
  declarations: [
    ReimbursementToeicComponent,
    ExampleFormComponent,
    ExamplePaginatorComponent,
    ExampleListViewSwitcherComponent,
    ExampleDataListComponent,
    ExampleInputDatepickerComponent,
    ExampleInputNumberComponent,
    ExampleInputMaxLengthComponent,
    ExampleInputTrimComponent,
    ExampleScrollServiceComponent,
    ExampleLoaderComponent,
    ExampleNoDataComponent,
    ExampleItemPerPageComponent,
    ExamplePageResultComponent,
    SnackbarComponent,
    SnackbarUpdateComponent,
    EligiblePersonComponent,
    SettingComponent,
    ReportsComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    DisburseRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularMaterialModule,
    SharedModule,
    AngularMaterialModule,
    PaginatorModule,
    FaIconModule,
    HttpClientModule,
    UploadModule,
    DialogModule,
    MaterialFileInputModule

  ],
  exports: [

  ],
  entryComponents: [
    SnackbarComponent,
    SnackbarUpdateComponent
  ],
  providers: [

  ]
})
export class DisburseModule { }
