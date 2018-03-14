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
  
  getUserProperties() {
    return this.userProperties;
  }

  setUserProperty(key: userProperty, value: any) {
    this.userProperties[key] = value;
  }

  updateUserProperties(token:string, _router, _userService, callback) {
    this.apiService.personToken(this.userProperties[userProperty.TOKEN]).subscribe((data) => { 
      this.setUserProperty(userProperty.PTOKEN, data);
      this.apiService.personByToken(this.getUserProperties()[userProperty.TOKEN]).subscribe((data) => {
        this.setUserProperty(userProperty.PERSON, data);
        callback(_router, _userService);
      });
    });
  }
}
