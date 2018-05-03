import { Component, OnInit } from '@angular/core';
import { UserService, Role } from './../service/user.service';
import { InformationService } from '../service/information.service';

@Component({
  selector: 'vrs-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  sPages: Array<any> = new Array();

  constructor(private informationService: InformationService) { }

  ngOnInit() {
    this.informationService.getInformation("i-2").subscribe((data) => {

    });
  }

  isAdmin(): boolean {
    return UserService.hasRole(Role.CMS_ADMIN);
  }

}
