import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { MetadataService } from '../service/metadata.service';
import { map } from '../../../../node_modules/rxjs/operators';

@Pipe({
  name: 'metadatalabel'
})
export class LabelPipe implements PipeTransform {
  value = '';
  rangeData: Array<any> = [];

  constructor(private metadataService: MetadataService) { }

  transform(value: string, range: string): Observable<string> {
    return this.metadataService.getMetadataRange(range).pipe(map(data => {
      this.rangeData = data.filter(e => e.id === value);
      this.value = this.rangeData
        .filter(val => val.id === value)
        .map(val => val.value).toString();
      return this.value;
    }, (err: any) => {
      console.log(err);
    }));
  }
}
