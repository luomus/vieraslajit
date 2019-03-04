import { Observable } from "rxjs";
import { Resolve } from "@angular/router";
import { Injectable } from "@angular/core";
import { InformationService } from "../shared/service/information.service";
import { findContentID, StaticContent } from "../../assets/i18n/cms-content";
import { TranslateService } from "@ngx-translate/core";

@Injectable()
export class ViekasResolver implements Resolve<Observable<any>> {
    constructor(private informationService: InformationService, private translate: TranslateService) {}
    resolve(): Observable<any> {
        return this.informationService.getInformation(findContentID(StaticContent.Viekas, this.translate.currentLang));
    }
}