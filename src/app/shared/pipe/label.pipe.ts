import { Pipe, PipeTransform } from '@angular/core';
import { MetadataService } from '../service/metadata.service';
import { Observable } from 'rxjs';
import { map } from '../../../../node_modules/rxjs/operators';
import { TranslateService } from '@ngx-translate/core';


@Pipe({
  name: 'metadatalabel'
})
export class LabelPipe implements PipeTransform {
  value = '';
  rangeData: Array<any>;

  constructor(private metadataService: MetadataService, private translate: TranslateService) { }

  transform(value: string, range: string, lang: string = this.translate.currentLang): any {
    return this.metadataService.getMetadataRange(range, 'multi').pipe(map(data => {
      this.rangeData = data.filter(e => e.id === value);
      this.value = this.rangeData
        .filter(val => val.id === value)
        .map(val => val.value[lang]).toString();
      return this.value;
    }, (err) => {
      console.log(err);
    }));

  }

}
