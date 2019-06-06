import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoaderService } from "../service/loader.service";
import { tap } from "rxjs/operators";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    constructor(private loaderService: LoaderService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            tap(
                (event: HttpEvent<any>) => {
                    if (event.type === HttpEventType.Sent) {
                        this.loaderService.register();
                    }
                    if (event.type === HttpEventType.Response) {
                        this.loaderService.complete();
                    }
                }
            )
        );
    }
}