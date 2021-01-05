import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { LoaderService } from "../service/loader.service";
import { tap, catchError } from "rxjs/operators";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    constructor(private loaderService: LoaderService) {}
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
                this.loaderService.complete(req.urlWithParams);
                return of();
            }),
            tap(
                (event: HttpEvent<any>) => {
                    if (event.type === HttpEventType.Sent) {
                        this.loaderService.register(req.urlWithParams);
                    }
                    if (event.type === HttpEventType.Response) {
                        this.loaderService.complete(req.urlWithParams);
                    }
                }
            )
        );
    }
}