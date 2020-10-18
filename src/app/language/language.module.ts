import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { LanguageSwitcherComponent } from './components/language-switcher/language-switcher.component';

import { AppSettings } from '../app-settings';
import { AngularMaterialModule } from '../angular-material/angular-material.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    LanguageSwitcherComponent,
  ],
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AngularMaterialModule,
  ],
  exports: [
    TranslateModule,
    LanguageSwitcherComponent,
  ],
})
export class LanguageModule {
  constructor(
    private translate: TranslateService,
  ) {
    this.translate.setDefaultLang(AppSettings.defaultLanguage);
    this.translate.use(AppSettings.defaultLanguage);
  }
}
