import { Injectable } from '@angular/core';
import { Observable ,  Subject ,  ReplaySubject } from 'rxjs';


@Injectable()
export class AlertService {

  private subject = new ReplaySubject<any>();

  constructor() { }

  sendAlert(alert: boolean) {
    this.subject.next({ alert: alert });
  }

  clearAlert() {
    this.subject.next({alert: false});
  }

  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }
}
