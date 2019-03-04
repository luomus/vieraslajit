import { Component, Input, OnChanges } from "@angular/core";
import { InformationService } from "../../shared/service/information.service";

@Component({
    selector: 'vrs-viekas-static',
    template: `
<div>
    <vrs-editcms [id]="id"></vrs-editcms>
    <h2>{{data?.title}}</h2>
    <div [innerHTML]="data?.content | parsewp"></div>
</div>
`,  styleUrls: ['./viekas-static.component.scss']
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