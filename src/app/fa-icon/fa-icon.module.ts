import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule, FaIconLibrary, FaConfig } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  exports: [
    FontAwesomeModule,
  ],
})
export class FaIconModule {
  constructor(
    private library: FaIconLibrary,
    private faConfig: FaConfig,
  ) {
    this.faConfig.defaultPrefix = 'fas';
    this.library.addIconPacks(fas, far);
  }
}
