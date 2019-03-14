import { Component, OnInit, AfterViewChecked, AfterViewInit, ViewChildren, QueryList, NgZone, Renderer2, ElementRef, ChangeDetectorRef, Input, OnDestroy } from '@angular/core';
import { UserService } from '../service/user.service';
import {Router} from '@angular/router';
import { InformationService } from '../service/information.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, of } from 'rxjs';
import { StaticContent, findContentID } from './../../../assets/i18n/cms-content';
import * as $ from 'jquery';
import { BsDropdownDirective } from '../../../../node_modules/ngx-bootstrap';
import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';

@Component({
  selector: 'vrs-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewChecked, AfterViewInit, OnDestroy {
  loginUrl = '#';
  fixedTop = false;
  isCollapsed = false;
  loggedIn = false;
  loginSub: Subscription;
  currentId: string= "";
  private dropdown_user_bound = false;
  private scrollListener;

  @Input() menu;

  @ViewChildren(BsDropdownDirective) d : QueryList<BsDropdownDirective>;

  constructor(private router: Router, private userService: UserService,
     private informationService: InformationService, private translate:TranslateService,
     private zone: NgZone,
     private renderer: Renderer2,
     private cd: ChangeDetectorRef) {
      this.loginSub = userService.loginStateChange.subscribe(() => {
        this.loggedIn = UserService.loggedIn();
      if(this.loggedIn == false) {
        // Use reload hack to force re-render of the component
        this.router.navigate(["reload/" + this.router.url]);
      }
    })
    /**
     * Update login url next parameter every time active route changes
     */
    router.events.subscribe((val) => {
      this.loginUrl = UserService.getLoginUrl(encodeURI(window.location.pathname));
    });

  }

  getCurrentLang() {
    return this.translate.currentLang;
  }

  ngOnInit() {
    this.zone.runOutsideAngular(() => {
      this.scrollListener = this.renderer.listen(window, 'scroll', () => {
        this.updateFixedTop();
      })
    });
  }

  private updateFixedTop() {
    const _fixedTop = this.fixedTop;
    if ($(window).scrollTop() < 86) {
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
      this.renderer.listen(el, "mouseenter", ()=>{
        dropdown.toggle(true);
      })
      this.renderer.listen(el, "click", ()=>{
        dropdown.toggle(false);
      })
      this.renderer.listen(el, "mouseleave", ()=>{
        dropdown.toggle(false);
      })
    })
  }

  /* dropdown-user is inside an *ngIf statement, so it can't be selected until the if statement is evaluated*/
  ngAfterViewChecked() {
    if(!this.dropdown_user_bound) {
      /* wait for the dropdown-user element to appear before binding */
      if($("#dropdown-user").length !== 0) {
        $("#dropdown-user").on("mouseenter mouseleave", ()=>{
          this.d.first.toggle(true);
        });
        this.dropdown_user_bound = true;
      }
    }
  }

  logout() {
    this.userService.logout();
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
  }
}
