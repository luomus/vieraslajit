import { Component, OnInit, AfterViewInit, ViewChildren, QueryList, NgZone, Renderer2, ChangeDetectorRef, Input, OnDestroy, EventEmitter, Output } from '@angular/core';
import { UserService } from '../service/user.service';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { BsDropdownDirective } from '../../../../node_modules/ngx-bootstrap';
import { LoaderService, LoadingEvent } from '../service/loader.service';
import { findContentID, StaticContent } from 'assets/i18n/cms-content';

@Component({
  selector: 'vrs-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
  fixedTop = false;
  isCollapsed = false;
  loggedIn = false;
  loginSub: Subscription;
  currentId: string= "";
  private scrollListener;
  loading = false;

  private destroyListeners: Function[] = []

  @Input() menu;
  @Input() loginUrl = '#';
  @Output() onLogout = new EventEmitter();

  @ViewChildren(BsDropdownDirective) d : QueryList<BsDropdownDirective>;

  constructor(private router: Router, private userService: UserService,
              private translate:TranslateService,
              private zone: NgZone,
              private renderer: Renderer2,
              private cd: ChangeDetectorRef,
              private loaderService: LoaderService) {}

  getCurrentLang() {
    return this.translate.currentLang;
  }

  ngOnInit() {
    this.loginSub = this.userService.loginStateChange.subscribe(() => {
      this.loggedIn = UserService.loggedIn();
      if(this.loggedIn == false) {
        // Use reload hack to force re-render of the component
        this.router.navigate(["reload/" + this.router.url], {skipLocationChange: true});
      }
    });

    this.zone.runOutsideAngular(() => {
      this.scrollListener = this.renderer.listen(window, 'scroll', () => {
        this.updateFixedTop();
      })
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.d.forEach((dropdown) => {
          dropdown.toggle(false);
        });
      }
    });
    this.loaderService.loading.subscribe((res) => {
      if (res === LoadingEvent.Start) {
        this.loading = true;
      }
      if (res === LoadingEvent.End) {
        this.loading = false;
      }
    })
  }

  private updateFixedTop() {
    const _fixedTop = this.fixedTop;
    let breakpoint = 110 - 54;
    if (window.innerWidth < 1200) {
      breakpoint = 89 - 52;
    }
    if (window.scrollY < breakpoint) {
        this.fixedTop = false;
    } else {
        this.fixedTop = true;
    }
    if (this.fixedTop !== _fixedTop) {
        this.cd.detectChanges();
    }
  }

  ngAfterViewInit() {
    this.d.forEach((dropdown) => {
      // hacking into private property (of dropdown directive) because we are above the law
      // @ts-ignore
      let el = dropdown._elementRef.nativeElement;
      this.destroyListeners.push(
        this.renderer.listen(el, "mouseenter", ()=>{
          dropdown.toggle(true);
        })
      );
      this.destroyListeners.push(
        this.renderer.listen(el, "mouseleave", ()=>{
          dropdown.toggle(false);
        })
      );
      this.destroyListeners.push(
        this.renderer.listen(el, "keyup", (e)=>{
          if (e.keyCode === 13) {
            dropdown.toggle(true);
          } else if (e.keyCode === 27) {
            dropdown.toggle(false);
          }
        }
      ));
    })
  }

  logout() {
    this.onLogout.emit();
  }

  userPropertiesWrapper(): any {
    if(this.loggedIn) {
      return UserService.getUserProperties();
    } else {
      return {person: {fullName: ''}};
    }
  }

  ngOnDestroy(){
    this.loginSub ? this.loginSub.unsubscribe() : null;
    this.cd.detach();
    if (this.scrollListener) {
      this.scrollListener();
    }
    this.destroyListeners.forEach(f => f());
  }

  getFAQId() {
    return findContentID(StaticContent.FAQ, this.translate.currentLang);
  }
}
