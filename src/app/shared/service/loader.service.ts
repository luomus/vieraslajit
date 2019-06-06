import { Injectable, EventEmitter, Inject, PLATFORM_ID } from "@angular/core";
import { Observable } from "rxjs";
import { DOCUMENT, isPlatformBrowser } from "@angular/common";

export enum LoadingEvent {
    Start, End
}

@Injectable()
export class LoaderService {
    loading = new EventEmitter<LoadingEvent>();
    _reqs = 0

    constructor(
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: object
    ) {}

    reset() {
        this._reqs = 0;
    }
    register() {
        this.loading.emit(LoadingEvent.Start);
        this._reqs++;
    }
    complete() {
        this._reqs--;
        if (this._reqs === 0) {
            if(isPlatformBrowser(this.platformId)) {
                setTimeout(() => {
                    if (this._reqs === 0) {
                        this.loading.emit(LoadingEvent.End);
                    }
                }, 100);
            } else {
                this.loading.emit(LoadingEvent.End);
            }
        }
        if (this._reqs < 0) {
            this._reqs = 0;
        }
    }
}
