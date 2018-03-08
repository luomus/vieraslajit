import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

enum userProperty {

}

@Injectable()
export class UserService {

  private userProperties = {};

  constructor() { }

  public static getLoginUrl(next = 'home', lang = 'fi') {
    return (environment.lajiAuth.loginUrl
    + '?target=' + environment.lajiAuth.systemID
    + '&redirectMethod=GET&locale=%lang%'
    + '&next=' + next).replace('%lang%', lang);
  }
  
  getUserProperties() {
    return this.userProperties;
  }

  setUserProperty(key: userProperty, value: string) {
    this.userProperties[key] = value;
  }
}
