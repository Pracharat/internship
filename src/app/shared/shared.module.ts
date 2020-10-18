import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AngularMaterialModule } from '@app-material/angular-material.module';
import { LanguageModule } from '../language/language.module';

import { LoaderComponent } from './components/loader/loader.component';
import { NoDataComponent } from './components/no-data/no-data.component';
import { ListViewSwitcherComponent } from './components/list-view-switcher/list-view-switcher.component';

import { PreventDefaultClickDirective } from './directives/prevent-default-click.directive';
import { StopPropagationClickDirective } from './directives/stop-propagation-click.directive';
import { ClickScrollTopLeftDirective } from './directives/click-scroll-top-left.directive';
import { InputMaxLengthDirective } from './directives/input-max-length.directive';
import { InputNumberDirective } from './directives/input-number.directive';
import { InputDateDirective } from './directives/input-date.directive';
import { InputTrimDirective } from './directives/input-trim.directive';
import { NumberMaskDirective } from './directives/number-mask.directive';
import { StrictcharacterDirective } from './directives/strictcharacter.directive';
import { RemarkDirective } from './directives/remark.directive';
import { RecieptNumberDirective } from './directives/reciept-number.directive';


@NgModule({
  declarations: [
    LoaderComponent,
    NoDataComponent,
    ListViewSwitcherComponent,
    PreventDefaultClickDirective,
    StopPropagationClickDirective,
    ClickScrollTopLeftDirective,
    InputMaxLengthDirective,
    InputNumberDirective,
    InputDateDirective,
    InputTrimDirective,
    NumberMaskDirective,
    StrictcharacterDirective,
    RemarkDirective,
    RecieptNumberDirective,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule,
  ],
  exports: [
    LanguageModule,
    LoaderComponent,
    NoDataComponent,
    ListViewSwitcherComponent,
    PreventDefaultClickDirective,
    StopPropagationClickDirective,
    ClickScrollTopLeftDirective,
    InputMaxLengthDirective,
    InputNumberDirective,
    InputDateDirective,
    InputTrimDirective,
    NumberMaskDirective,
    StrictcharacterDirective,
    RemarkDirective,
    RecieptNumberDirective,
    
  ],
})
export class SharedModule { }
