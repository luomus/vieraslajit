import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {

  constructor() { }

  testi() {
    return {
      testValue: 'dataa'
    }
  }

}
