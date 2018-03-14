import {Router, ActivatedRoute, Params} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService, userProperty } from '../../shared/service/user.service';

@Component({
  selector: 'vrs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit() {
    // save laji-auth token to userproperties
    this.userService.setUserProperty(userProperty.TOKEN, this.activatedRoute.snapshot.queryParams['token']);
    // update userproperties with laji api data
    this.userService.updateUserProperties(this.activatedRoute.snapshot.queryParams['token'], this.router, this.userService, function(_router, _userService) {
      // redirect to original location
      _router.navigateByUrl(_userService.getUserProperties()["person-token"].next);
    })
  }
}
