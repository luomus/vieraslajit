import { TaxonService } from "../../../../shared/service/taxon.service";
import { Component, OnInit, Renderer2, Inject } from "../../../../../../node_modules/@angular/core";
import { EventEmitter } from 'events'
import * as $ from 'jquery';
import { TranslateService } from "../../../../../../node_modules/@ngx-translate/core";
import { PLATFORM_BROWSER_ID, isPlatformBrowser } from "@angular/common/src/platform_id";

@Component({
    selector: "vrs-taxon-search",
    template: `
<div class='autocomplete' (keyup)="keyEvent($event)">
    <span class="oi oi-magnifying-glass"></span>
    <input type='text' id='vrs-taxon-search-textarea' (blur)="onSearchAreaBlur($event)"
           (input)="onSearchAreaInput($event)" (focusin)="onSearchAreaInput($event)"
           class='form-control' placeholder="Valitse laji">
</div>

<div class="selected-taxon">
    <span>{{taxonId | taxonname:translate.currentLang | async}}</span>
    <a class='oi oi-x icon' (click)="removeSelected()"></a>
</div>`,
    styleUrls: ["./taxon-search.component.scss"]
})
export class TaxonSearchComponent implements OnInit {
    private items: HTMLElement;
    eventEmitter:EventEmitter = new EventEmitter();

    taxonId = '';
    constructor(private taxonService: TaxonService,
                public translate: TranslateService,
                private renderer: Renderer2,
                @Inject(PLATFORM_BROWSER_ID) private platformId) {}

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            $('.selected-taxon').hide();
            this.initBase();
        }
    }

    onSearchAreaInput(event) {
        const val = event.target.value;
        const el: HTMLElement = this.renderer.selectRootElement('#autocomplete-items');
        this.taxonService.getAutocomplete('taxon', val, this.translate.currentLang).subscribe((r)=>{
            console.dir(el);
            console.log(el.children);
            for (let child of Array.from(el.children)) {
                console.log('iterating right now !!!!!!!!!');
                console.dir(child);
                child.remove();
            }
            $('#autocomplete-items').children().each((a, b)=>{
                b.remove();
            });
            if(r.length > 0) {
                r.forEach(element => {
                    let b = document.createElement("div");
                    $(b).addClass("autocomplete-item");
                    $('#autocomplete-items').append(b);
                    b.innerHTML = element.payload.matchingName;
                    b.onclick = ()=>{
                        this.fillValue(element.key);
                    }
                });
            }
        });
    }

    onSearchAreaBlur(event) {
        if($('#autocomplete-items:hover').length == 0) {
            this.initBase();
        }
    }

    initBase() {
        this.items? this.items.remove(): null;
        this.items = document.createElement("div");
        this.items.setAttribute("id", "autocomplete-items");
        $('.autocomplete').append(this.items);
    }

    fillValue(id:string, emit = true) {
        this.taxonId = id;
        $('#vrs-taxon-search-textarea').val('');
        $('.selected-taxon').show();
        this.initBase();
        if (emit) this.eventEmitter.emit("change", id);
    }

    removeSelected() {
        $('.selected-taxon').hide();
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
                $($('#autocomplete-items').children()[0]).addClass("vrs-taxon-search-active");
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