import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReimbursementToeicComponent } from './component/reimbursement-toeic/reimbursement-toeic.component';
import { DisburseComponent } from './disburse.component';
import { ExampleFormComponent } from './component/example-form/example-form.component';
import { SettingComponent } from './component/setting/setting.component';
import { ReportsComponent } from './component/reports/reports.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';


const routes: Routes = [
  { path:  'toeic' , component : ReimbursementToeicComponent },
  { path:  'exam' , component : ExampleFormComponent },
  { path:  'setting' , component : SettingComponent },
  { path:  'reports' , component : ReportsComponent },
  { path:  'dashboard' , component : DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisburseRoutingModule { }
