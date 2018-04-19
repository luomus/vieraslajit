import { Component, OnInit, TemplateRef} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { SearchComponent } from '../googlesearch/search/search.component';
import { UserService, Role } from '../service/user.service';
import {Router} from '@angular/router';
import { InformationService } from '../service/information.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';



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
  menu: Array<any> = new Array();
  loginSub: Subscription;
  translateSub: Subscription;
  parentId: string = "";
  currentId: string= "";
  
  constructor(private modalService: BsModalService, private router: Router, private userService: UserService,
     private informationService: InformationService, private translate:TranslateService) {

    // temporary suboptimal solution (a lot more updates than necessary)

    this.loginSub = userService.loginStateChange.subscribe(() => {
      if(UserService.loggedIn()) {
        this.setLoggedIn();
      }
      this.loggedIn = UserService.loggedIn();
    })
    /**
     * Update login url next parameter every time active route changes
     */
    router.events.subscribe((val) => {
      this.loginUrl = UserService.getLoginUrl(encodeURI(window.location.pathname));
    });
    
  }

  ngOnInit() {
    this.translate.onLangChange.subscribe((event) =>{
      this.setCMSRootId(event.lang);
      this.updateMenu();

      //let currentUrl = window.location.href;
      //let newUrl = currentUrl.replace(/i-[0-9]+/,'i-155');
      //window.location.href= newUrl;
      
  
    });
  }

  /**
   * Fetches new static content from API starting with root id, which returns children content array 
   * and then loops through children and fetches their content
   */
  updateMenu(){
    this.informationService.getInformation(this.parentId).subscribe((data) => {
      this.menu= [];
      for(let c of data.children) {
        this.informationService.getInformation(c.id).subscribe((data)=>{
          this.menu.push(data);
        })
      }
    })
  }

  /**
   * Changes root id used in static content API call when language changes
   */

  setCMSRootId(lang: string) {
    if (lang== "fi"){
      this.parentId= "i-2";
    }
    if (lang== "en"){
      this.parentId= "i-16";
    }
    if (lang== "sv"){
      this.parentId= "i-14";
    }
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

  ngOnDestroy(){
    this.loginSub.unsubscribe();
  }

}
