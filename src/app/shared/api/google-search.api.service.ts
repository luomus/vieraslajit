import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../environments/environment';

@Injectable()
export class GoogleSearchApiService {
    baseUrl = environment.googleSearch.url
    engineId = environment.googleSearch.engineId
    constructor(private http: HttpClient) {}
    list(q, optional?) {
        return this.http.get(
            this.baseUrl,
            {params: {
                q: q,
                cx: this.engineId,
                ...optional
            }}
        );
    }
}