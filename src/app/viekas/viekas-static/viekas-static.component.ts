import { Component, Input, OnChanges } from "@angular/core";
import { InformationService } from "../../shared/service/information.service";

@Component({
    selector: 'vrs-viekas-static',
    template: `
<vrs-editcms [id]="id"></vrs-editcms>
<h2>{{data?.title}}</h2>
<div [innerHTML]="data?.content | parsewp"></div>
`
})
export class ViekasStaticComponent implements OnChanges {
    @Input() id;
    data;
    constructor(private informationService: InformationService){}
    ngOnChanges(changes) {
        this.informationService.getInformation(changes.id.currentValue).subscribe((res)=>{
            this.data = res;
        });
    }
}