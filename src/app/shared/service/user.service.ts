import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs/Observable';

export enum userProperty {
  TOKEN = 'token',
  ID = 'personId'
}

@Injectable()
export class UserService {

  private userProperties = {};

  constructor(private apiService: ApiService) { }

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

  verifyToken(token: string) {
    this.apiService.authToken(this.userProperties[userProperty.TOKEN]).subscribe((data) => { 
      this.setUserProperty(userProperty.ID, data[userProperty.ID]);
    });
  }
}
