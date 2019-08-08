import { Pipe, PipeTransform, ChangeDetectorRef, NgZone } from '@angular/core';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'dateTranslate'
})
export class DateTranslatePipe implements PipeTransform {
  constructor(private translate: TranslateService) { }

  transform(input): string {
    const m = moment(input)
    m.locale(this.translate.currentLang)
    return m.fromNow()
  }

}
