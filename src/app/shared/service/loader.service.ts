import { Injectable, EventEmitter, Inject, PLATFORM_ID } from "@angular/core";
import { Observable } from "rxjs";
import { DOCUMENT, isPlatformBrowser } from "@angular/common";

export enum LoadingEvent {
    Start, End
}

@Injectable()
export class LoaderService {
    loading = new EventEmitter<LoadingEvent>();

    private ttls: {[i: number]: number} = {};
    private loaderNameIndex = 1;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        @Inject(PLATFORM_ID) private platformId: object
    ) {
        if (isPlatformBrowser(this.platformId)) {
            window.setInterval(() => {
                Object.entries(this.ttls).forEach(([key, ttl]) => {
                    this.ttls[key] = ttl - 1;
                    if (ttl <= 0) {
                        this.complete(key);
                    }
                });
            }, 1000);
        }
    }

    reset() {
        this.ttls = {};
    }

    register(name?: string | number, ttl = 5) {
        let loaderName;
        if (name) {
            loaderName = name
        } else {
            loaderName = this.loaderNameIndex;
            this.loaderNameIndex++;
        }
        this.ttls[loaderName] = ttl;

        this.loading.emit(LoadingEvent.Start);
        return loaderName;
    }

    complete(name: string | number) {
        if (!name) {
            console.error('LoaderService.complete: No loader name supplied!')
            return;
        }
        delete this.ttls[name];

        if (Object.keys(this.ttls).length === 0) {
            if(isPlatformBrowser(this.platformId)) {
                setTimeout(() => {
                    if (Object.keys(this.ttls).length === 0) {
                        this.loading.emit(LoadingEvent.End);
                    }
                }, 100);
            } else {
                this.loading.emit(LoadingEvent.End);
            }
        }
    }
}
