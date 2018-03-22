import { Pipe, PipeTransform } from '@angular/core';
import { MetadataService } from '../service/metadata.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'label'
})
export class LabelPipe implements PipeTransform {
  value = '';
  rangeData: Array<any>;

  constructor(private metadataService: MetadataService, private translate: TranslateService) { }

  transform(value: string, range?: string): any {
    return this.metadataService.getMetadataRange(range, 'multi').map(data => {
      this.rangeData = data.filter(e => e.id === value);
      this.value = this.rangeData
        .filter(val => val.id === value)
        .map(val => val.value[this.translate.currentLang]).toString();
      return this.value;
    }, (err) => {
      console.log(err);
    });

  }

}
