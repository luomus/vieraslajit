import { Component, Input, OnInit } from "../../../node_modules/@angular/core";
import { ActivatedRoute } from "../../../node_modules/@angular/router";

@Component({
    selector: 'vrs-static-wrapper',
    template:   `<div class="container">
                    <div class="card card-body">
                        <vrs-static [id]='id'></vrs-static>
                    </div>
                <div>`,
    styleUrls: ['static-wrapper.component.scss']
})
export class StaticWrapperComponent implements OnInit {
    @Input() id: string;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        if(!this.id){
            this.route.params.subscribe(params => {
                this.id = params['id'];
            });
        }
    }
}