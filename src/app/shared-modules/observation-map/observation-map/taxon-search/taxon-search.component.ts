import { TaxonService } from "../../../../shared/service/taxon.service";
import { Component, OnInit } from "../../../../../../node_modules/@angular/core";
import * as $ from 'jquery';
import { TranslateService } from "../../../../../../node_modules/@ngx-translate/core";

@Component({
    selector: "vrs-taxon-search",
    template: "<div class='autocomplete'><input type='text' id='vrs-taxon-search-textarea'></div><input type='submit' id='vrs-taxon-search-submit' (click)='this.submit()'>",
    styleUrls: ["./taxon-search.component.scss"]
})
export class TaxonSearchComponent implements OnInit {
    private base: HTMLElement;

    constructor(private taxonService: TaxonService, private translate: TranslateService) {}

    ngOnInit() {
        this.initBase();

        $('#vrs-taxon-search-textarea').on('blur', ()=>{
            if($('.autocomplete-items:hover').length == 0) {
                this.initBase();
            }
        });
        $('#vrs-taxon-search-textarea').on('input focusin', ()=>{
            this.taxonService.getAutocomplete('taxon', $('#vrs-taxon-search-textarea').val().toString(), this.translate.currentLang).subscribe((r)=>{
                $('.autocomplete-items').children().each((a, b)=>{
                    b.remove();
                });
                if(r.length > 0) {
                    r.forEach(element => {
                        let b = document.createElement("div");
                        $('.autocomplete-items').append(b);
                        b.innerHTML = element.payload.matchingName;
                        b.onclick = ()=>{
                            this.fillValue(element.payload.matchingName);
                        }
                    });
                }
            });
        });
    }

    initBase() {
        this.base? this.base.remove(): null;
        this.base = document.createElement("div");
        this.base.setAttribute("class", "autocomplete-items");
        $('.autocomplete').append(this.base);
    }

    fillValue(val: string) {
        $('#vrs-taxon-search-textarea').val(val);
        this.initBase();
    }

    submit() {
        
    }
}