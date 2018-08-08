import { ReplaySubject ,  Subject } from 'rxjs';
import { convertToParamMap, ParamMap, Params } from '@angular/router';

export class ActivatedRouteStub {
    private paramSubject = new Subject<Params>();

    constructor(initialParams?: Params) {
        this.setParams(initialParams);
    }

    readonly params = this.paramSubject.asObservable();

    setParams(params?: Params) {
        this.paramSubject.next(params);
    };
}