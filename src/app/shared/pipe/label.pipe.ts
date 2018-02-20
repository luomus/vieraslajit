import { Pipe, PipeTransform } from '@angular/core';
import { MetadataService } from '../service/metadata.service';

@Pipe({
  name: 'label'
})
export class LabelPipe implements PipeTransform {
  value = '';
  rangeData = [];

  constructor(private metadataService: MetadataService) { }

  transform(value: string, range?: string): any {

    // Replace range and lang params with something better later.
    this.metadataService.getMetadataRange(range, 'fi').subscribe(data => {
      this.rangeData = data;
      this.value = this.rangeData
        .filter(val => val.id === value)
        .map(val => val.value)
     .toString();
      return this.value;

    });


  }

}
