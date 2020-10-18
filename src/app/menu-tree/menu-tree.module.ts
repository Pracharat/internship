import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';
import { AngularMaterialModule } from '@app-material/angular-material.module';
import { FaIconModule } from '@app-fa-icon/fa-icon.module';

import { MenuTreeComponent } from './components/menu-tree/menu-tree.component';
import { MenuTreeButtonComponent } from './components/menu-tree-button/menu-tree-button.component';
import { MenuTreeButtonIconComponent } from './components/menu-tree-button-icon/menu-tree-button-icon.component';

@NgModule({
  declarations: [
    MenuTreeComponent,
    MenuTreeButtonComponent,
    MenuTreeButtonIconComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    AngularMaterialModule,
    FaIconModule,
  ],
  exports: [
    MenuTreeComponent,
  ],
})
export class MenuTreeModule { }
