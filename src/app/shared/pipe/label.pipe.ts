import { Pipe, PipeTransform } from '@angular/core';
import { MetadataService } from '../service/metadata.service';

@Pipe({
  name: 'label'
})
export class LabelPipe implements PipeTransform {
  value = '';
  rangeData = [];

  constructor(private metadataService: MetadataService) { }

  transform(value: string, args?: any): any {
    // Replace range and lang params with something better later.
    this.metadataService.getMetadataRange('MX.adminStatusEnum', 'fi').subscribe(data => {
      this.rangeData = data;
    });
    this.rangeData
      .filter(val => val.id === value)
      .map(val => val.value)
      .toString();
  }

}
