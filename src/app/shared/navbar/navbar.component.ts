import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'vrs-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private loginUrl = '#';

  constructor() { }

  ngOnInit() {
    this.loginUrl = UserService.getLoginUrl();
  }

}
