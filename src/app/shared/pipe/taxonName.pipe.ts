import { Pipe, PipeTransform } from '@angular/core';
import { map } from '../../../../node_modules/rxjs/operators';
import { of } from 'rxjs';
import { TaxonService } from '../service/taxon.service';


@Pipe({
  name: 'taxonname'
})
export class TaxonNamePipe implements PipeTransform {
  id = '';

  constructor(private taxonService: TaxonService) { }

  transform(id: string, lang: string): any {
    if (id === this.id) return of([]);
    this.id = id;
    return this.taxonService.getTaxon(id, lang).pipe(map((res) => res.vernacularName));
  }

}
