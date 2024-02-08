import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { UserService } from './shared/service/user.service';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { StateService } from './state.service';
import { SwUpdate } from '@angular/service-worker';
import { LoaderService } from './shared/service/loader.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { environment } from 'environments/environment';
import { filter } from 'rxjs/operators';

/**
 * Main component that acts as a container for navigation, content and footer.
 */

@Component({
  selector: 'vrs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  prefix = 'vrs';
  isPopState = false;
  hideFooter = false;
  displaySwUpdate = false;
  useAnalytics = false;

  private navLoaderIdx;

  /**
  * Initializes TranslateService
  * 1. Use English if a particular translation element is not found
  * 2. Use either the default language or language stored in localStorage
  */
  constructor(
    state: StateService,
    private translate: TranslateService,
    private userService: UserService,
    private router: Router,
    private swUpdate: SwUpdate,
    private loaderService: LoaderService,
    private meta: Meta,
    private title: Title,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loaderService.reset();
        this.navLoaderIdx = this.loaderService.register();
      }
      if (event instanceof NavigationEnd) {
        if (this.navLoaderIdx) this.loaderService.complete(this.navLoaderIdx);
        this.hideFooter = !state.footerEnabled;
        this.meta.updateTag(
          {
            property: "og:url",
            content: environment.baseUrl + this.router.url
          }
        );
      }
    });

    /**
    * Use English if translation is not found
    */
    translate.setDefaultLang('en');

    this.translate.onLangChange.subscribe((e: LangChangeEvent) => {
      if (isPlatformBrowser(this.platformId)) {
        this.document.documentElement.lang = e.lang;
      }
    })

    /**
    * User's language choice is stored in localStorage, if language is not found
    * then use Finnish
    */
    if (window.localStorage.getItem("vrs-lang")) {
      translate.use(window.localStorage.getItem("vrs-lang"));
    } else {
      translate.use('fi');
    }

    if (UserService.getToken()) {
      userService.updateUserProperties(UserService.getToken());
    }

    this.meta.addTags([
      {
        property: "og:url",
        content: environment.baseUrl + this.router.url
      },
      {
        property: "og:type",
        content: "website"
      },
      {
        property: "og:title",
        content: this.title.getTitle()
      },
      {
        property: "og:description",
        content: this.translate.instant('og.home.description')
      },
      {
        property: "description",
        content: this.translate.instant('og.home.description')
      },
      {
        property: "og:image",
        content: environment.baseUrl + "/assets/images/logos/vieraslajit_logo.png"
      }
    ])
  }
  ngOnInit() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates.pipe(filter(e => e.type === 'VERSION_READY')).subscribe(() => {
          this.displaySwUpdate = true;
      });
    }
  }
  onAcceptUpdate() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.activateUpdate().then(() => window.location.reload());
    }
  }
}

