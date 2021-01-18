import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Language} from '../../model/Language';
import {LanguageStorageService} from '../../services/language-storage.service';

@Component({
  selector: 'app-language-switch',
  templateUrl: './language-switch.component.html',
  styleUrls: ['./language-switch.component.scss']
})
export class LanguageSwitchComponent implements OnInit {
  languages: Language[];
  selectedLanguage!: Language;

  constructor(public translateService: TranslateService, private languageStorage: LanguageStorageService) {
    this.languages = [
      {name: 'Русский', code: 'ru'},
      {name: 'English', code: 'en'}
    ];
  }

  ngOnInit() {
    let currentLangCode = this.translateService.currentLang ?? this.translateService.defaultLang;
    this.selectedLanguage = this.languages.find(lang => lang.code == currentLangCode)!;
  }

  changeLanguage() {
    this.translateService.use(this.selectedLanguage.code);
    this.languageStorage.store(this.selectedLanguage.code)
  }
}
