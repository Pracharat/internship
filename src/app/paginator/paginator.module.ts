import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';



import { PaginatorComponent } from './components/paginator/paginator.component';
import { ItemPerPageComponent } from './components/item-per-page/item-per-page.component';
import { PageResultComponent } from './components/page-result/page-result.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

@NgModule({
  declarations: [
    PaginatorComponent,
    ItemPerPageComponent,
    PageResultComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    AngularMaterialModule,
  ],
  exports: [
    PaginatorComponent,
    ItemPerPageComponent,
    PageResultComponent,
  ],
})
export class PaginatorModule { }
