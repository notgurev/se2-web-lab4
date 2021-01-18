import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageStorageService {
  private storage = localStorage;

  store(code: string): void {
    this.storage.setItem('selectedLanguageCode', code);
  }

  load(): string | null {
    return this.storage.getItem('selectedLanguageCode');
  }
}
