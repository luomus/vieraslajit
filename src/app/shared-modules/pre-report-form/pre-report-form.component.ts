import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ApiService } from 'app/shared/api/api.service';
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
  customReportFormLink: string | undefined;
  taxonId: string | undefined;
  taxonName: string | undefined;

  constructor(private apiService: ApiService, private translate: TranslateService) { }

  ngOnInit() {
  }

  onTaxonChange(id: string) {
    this.taxonId = id
    this.linkEnabled = false;
    if (id) {
      this.apiService.getTaxon(id, {
        selectedFields: 'customReportFormLink,vernacularName,scientificName'
      }).pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
        this.customReportFormLink = res.customReportFormLink
          ? (res.customReportFormLink.includes('?')
            ? res.customReportFormLink.concat(`&lang=${this.translate.currentLang}&locale=${this.translate.currentLang}`)
            : res.customReportFormLink.concat(`?lang=${this.translate.currentLang}&locale=${this.translate.currentLang}`)
          ) : undefined;
        this.taxonName = res.vernacularName ? res.vernacularName : res.scientificName
        this.linkEnabled = true
      })
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
