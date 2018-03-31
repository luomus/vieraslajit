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
    if (this.activatedRoute.snapshot.queryParams['token']) {
      // save laji-auth token to userproperties
      UserService.setToken(this.activatedRoute.snapshot.queryParams['token']);
      // update userproperties with laji api data
      this.userService.updateUserProperties(UserService.getToken(), this.router, this.userService, function(_router, _userService) {
        // redirect to original location
        _router.navigateByUrl(UserService.getUserProperties()["person-token"].next);
      });
    } else {
      this.router.navigateByUrl("/home");
    }
  }
}
