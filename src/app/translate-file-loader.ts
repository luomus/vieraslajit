import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of as ObservableOf } from 'rxjs';

export class TranslateFileLoader implements TranslateLoader {
  private translations = {
    'en': require('../assets/i18n/en.json'),
    'fi': require('../assets/i18n/fi.json'),
    'sv': require('../assets/i18n/sv.json'),
  };

  getTranslation(lang: string): Observable<any> {
    if (!this.translations[lang]) {
      return ObservableOf({});
    }
    return ObservableOf(this.translations[lang]);
  }
}
