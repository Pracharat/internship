import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { AppSettings } from 'src/app/app-settings';

import { LabelValue } from '@app-models/common/label-value.model';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss']
})
export class LanguageSwitcherComponent implements OnInit {

  languages: LabelValue[] = AppSettings.languages;
  private defaultLanguage = AppSettings.defaultLanguage;
  currentLanguage: string = this.defaultLanguage;

  constructor(
    private translate: TranslateService,
  ) { }

  ngOnInit() {
  }

  switchLanguage(language: LabelValue) {
    this.currentLanguage = language.value;
    this.translate.use(language.value);
  }

}
