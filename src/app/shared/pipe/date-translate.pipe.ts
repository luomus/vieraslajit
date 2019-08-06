import { Pipe, PipeTransform, ChangeDetectorRef, NgZone } from '@angular/core';
import { MetadataService } from '../service/metadata.service';
import { Observable } from 'rxjs';
import { map } from '../../../../node_modules/rxjs/operators';
import { TimeAgoPipe } from 'angular2-moment';


@Pipe({
  name: 'dateTranslate'
})
export class DateTranslatePipe implements PipeTransform {
  constructor(private cdr: ChangeDetectorRef, private zone: NgZone) { }

  transform(input): string {
    let am = new TimeAgoPipe(this.cdr, this.zone).transform(input)
    am = am.toString()
    am = am.replace(/ago/, 'sitten')
    am = am.replace(/a few/, 'muutama')
    am = am.replace(/seconds/, 'sekuntia')
    am = am.replace(/a minute/, 'minuutti')
    am = am.replace(/minutes/, 'minuuttia')
    am = am.replace(/hours/, 'tuntia')
    am = am.replace(/hour/, 'tunti')
    am = am.replace(/days/, 'päivää')
    am = am.replace(/day/, 'päivä')
    am = am.replace(/months/, 'kuukautta')
    am = am.replace(/month/, 'kuukausi')
    am = am.replace(/years/, 'vuotta')
    am = am.replace(/year/, 'vuosi')
    return am;
  }

}
