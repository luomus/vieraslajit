import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { TaxonService } from 'app/shared/service/taxon.service';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'vrs-pre-report-form',
  templateUrl: './pre-report-form.component.html',
  styleUrls: ['./pre-report-form.component.scss']
})
export class PreReportFormComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>();

  linkEnabled = false;
  customReportFormLink: string
  taxonId: string

  constructor(private taxonService: TaxonService, private translate: TranslateService) { }

  ngOnInit() {
  }

  onTaxonChange(id: string) {
    this.taxonId = id
    this.linkEnabled = false;
    if (id) {
      this.taxonService.getTaxon(id, this.translate.currentLang, {
        selectedFields: [
          'customReportFormLink',
        ],
      }).pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
        this.customReportFormLink = res.customReportFormLink
        this.linkEnabled = true
      })
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
