import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { SearchComponent } from '../googlesearch/search/search.component';
import { UserService, Role } from '../service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'vrs-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  modalRef: BsModalRef;
  loginUrl = '#';
  isCollapsed = false;
  loggedIn = false;
  _subscription: any;
  
  constructor(private modalService: BsModalService, private router: Router, private userService: UserService) {
    /**
     * Update user section of navbar whenever login state changes
     */
    this._subscription = userService.loginStateChange.subscribe(() => {
      if(UserService.loggedIn) {
        this.setLoggedIn();
      }
      this.loggedIn = UserService.loggedIn();
      console.log(UserService.getUserProperties());
    })
    /**
     * Update login url next parameter every time active route changes
     */
    router.events.subscribe((val) => {
      this.loginUrl = UserService.getLoginUrl(encodeURI(window.location.pathname));
    });
  }

  ngOnInit() {

  }

  logout() {
    this.userService.logout();
  }

  setLoggedIn() {
    this.loggedIn = UserService.loggedIn();
  }

  userPropertiesWrapper() {
    if(this.loggedIn) {
      return UserService.getUserProperties();
    }
  }

  isCMSAdmin() {
    return UserService.hasRole(Role.CMS_ADMIN);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
