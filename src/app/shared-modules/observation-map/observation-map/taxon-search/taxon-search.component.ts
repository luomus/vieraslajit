import { TaxonService } from "../../../../shared/service/taxon.service";
import { Component, OnInit } from "../../../../../../node_modules/@angular/core";
import { EventEmitter } from 'events'
import * as $ from 'jquery';
import { TranslateService } from "../../../../../../node_modules/@ngx-translate/core";

@Component({
    selector: "vrs-taxon-search",
    template: `<div class='autocomplete' (keyup)="keyEvent($event)">
    <span class="oi oi-magnifying-glass"></span>
    <input type='text' id='vrs-taxon-search-textarea' class='form-control' placeholder="Valitse laji"></div>
    <div>
        <span id='selectedTaxon'></span>
        <a id='removeSelected' class='oi oi-x icon' (click)="removeSelected()"></a>
    </div>`,
    styleUrls: ["./taxon-search.component.scss"]
})
export class TaxonSearchComponent implements OnInit {
    private base: HTMLElement;
    eventEmitter:EventEmitter = new EventEmitter

    constructor(private taxonService: TaxonService, private translate: TranslateService) {}

    ngOnInit() {
        $('#removeSelected').hide();
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
                        $(b).addClass("autocomplete-item");
                        $('.autocomplete-items').append(b);
                        b.innerHTML = element.payload.matchingName;
                        b.onclick = ()=>{
                            this.fillValue(element.payload.matchingName, element.key);
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

    fillValue(val: string, id:string, emit = true) {
        $('#selectedTaxon').text(val + ' ' + id);
        $('#vrs-taxon-search-textarea').val('');
        $('#removeSelected').show();
        this.initBase();
        if (emit) this.eventEmitter.emit("change", id);
    }

    removeSelected() {
        $('#selectedTaxon').text('');
        $('#removeSelected').hide();
        this.eventEmitter.emit("change", null);
    }

    keyEvent(e) {
        // up key
        if (e.keyCode === 38) {
            let current = $('.vrs-taxon-search-active');
            if(current.prev().length) {
                current.prev().addClass('vrs-taxon-search-active');
                current.removeClass('vrs-taxon-search-active');
            }
        }
        //down key
        if (e.keyCode === 40) {
            let current = $('.vrs-taxon-search-active');
            if(!current.length) {
                $($('.autocomplete-items').children()[0]).addClass("vrs-taxon-search-active");
            }
            if(current.next().length) {
                current.next().addClass('vrs-taxon-search-active');
                current.removeClass('vrs-taxon-search-active');
            }
        }
        //Enter
        if (e.keyCode === 13) {
            let current = $('.vrs-taxon-search-active');
            current.click();
            current.removeClass('vrs-taxon-search-active');
        }
    
      }
}