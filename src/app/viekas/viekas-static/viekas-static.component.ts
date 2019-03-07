import { Component, Input, OnChanges } from "@angular/core";
import { InformationService } from "../../shared/service/information.service";
import { DomSanitizer } from "@angular/platform-browser";
import { parseWP } from "../../shared/pipe/parse-wp.pipe";

@Component({
    selector: 'vrs-viekas-static',
    templateUrl: 'viekas-static.component.html',
    styleUrls: ['./viekas-static.component.scss']
})
export class ViekasStaticComponent implements OnChanges {
    @Input() id;
    data;
    safeHtml;
    constructor(private informationService: InformationService,
                private sanitizer: DomSanitizer){}
    ngOnChanges(changes) {
        this.informationService.getInformation(changes.id.currentValue).subscribe((res)=>{
            this.data = res;
            this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(parseWP(res.content));
        });
    }
}