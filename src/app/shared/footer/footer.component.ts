import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { findContentID, StaticContent } from 'assets/i18n/cms-content';

@Component({
  selector: 'vrs-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  onHomePage$: Observable<boolean>;
  
  findContentId = (sc: StaticContent) => findContentID(sc, this.translate.currentLang)
  StaticContent = StaticContent

  constructor(private route: ActivatedRoute, private router: Router, private translate: TranslateService) { }
  ngOnInit() {
    this.onHomePage$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event: NavigationEnd) => {
        return event.url.length <= 1
      })
    )
  }
}
