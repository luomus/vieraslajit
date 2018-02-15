import { Pipe, PipeTransform } from '@angular/core';
import { MetadataService } from '../service/metadata.service';

@Pipe({
  name: 'label'
})
export class LabelPipe implements PipeTransform {

  constructor(private metadataService: MetadataService) { }

  transform(value: any, args?: any): any {
    return null;
  }

}
