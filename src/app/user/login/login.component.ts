import {Router, ActivatedRoute, Params} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService, userProperty } from '../../shared/service/user.service';

@Component({
  selector: 'vrs-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private redirectUrl = "";

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.setUserProperty(userProperty.TOKEN, this.activatedRoute.snapshot.queryParams['token']);
    console.log(this.userService.getUserProperties());
    //console.log(this.userService.verifyToken(this.activatedRoute.snapshot.queryParams['token']));
    
    this.userService.verifyToken(this.activatedRoute.snapshot.queryParams['token']);
    this.router.navigateByUrl(this.redirectUrl);
  }
}
