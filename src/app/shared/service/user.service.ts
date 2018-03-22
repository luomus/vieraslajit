import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs/Observable';

export enum userProperty {
  TOKEN = 'token',
  ID = 'personId',
  PERSON = 'person',
  PTOKEN = 'person-token'
}

@Injectable()
export class UserService {

  private userProperties = {};

  constructor(private apiService: ApiService) { }

  public static getLoginUrl(next) {
    return (environment.lajiAuth.authUrl + 'login'
    + '?target=' + environment.lajiAuth.systemID
    + '&redirectMethod=GET&locale=%lang%'
    + '&next=' + next).replace('%lang%', 'fi');
  }

  getToken(){
    return window.sessionStorage.getItem(userProperty.ID);
  }
  
  getUserProperties() {
    let res = {};
    for(let u in userProperty) {
      res[userProperty[u]] = JSON.parse(window.sessionStorage.getItem(userProperty[u]));
    }
    return res;
  }

  setUserProperty(key: userProperty, value: any) {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }

  updateUserProperties(token:string, _router, _userService, callback) {
    this.apiService.personToken(this.getUserProperties()[userProperty.TOKEN]).subscribe((data) => { 
      this.setUserProperty(userProperty.PTOKEN, data);
      this.apiService.personByToken(this.getUserProperties()[userProperty.TOKEN]).subscribe((data) => {
        this.setUserProperty(userProperty.PERSON, data);
        console.log(this.getUserProperties());
        callback(_router, _userService);
      });
    });
  }
}
