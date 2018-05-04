import { Component, OnInit } from '@angular/core';
import { UserService, Role } from './../service/user.service';
import { InformationService } from '../service/information.service';
import { findContentID, StaticContent } from '../../../assets/i18n/cms-content';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'vrs-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  sPages: Array<any> = new Array();

  constructor(private informationService: InformationService, private translate: TranslateService) { }

  ngOnInit() {
    this.informationService.getInformation(findContentID(StaticContent.Root, this.translate.currentLang)).subscribe((data) => {
      for(let c of data.children) {
        this.sPages.push(c);
        this.informationService.getInformation(c.id).subscribe((data2) => {
          if(data2.children) {
            for(let c2 of data2.children) {
              this.sPages.push(c2);
            }
          }
        });
      }
    });
  }

  isAdmin(): boolean {
    return UserService.hasRole(Role.CMS_ADMIN);
  }

}
