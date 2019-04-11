import { Component, EventEmitter, Output, Input, ViewChild, ElementRef } from "@angular/core";
import { TaxonSearchComponent } from "../taxon-search/taxon-search.component";
import { TimeSelectorComponent } from "../time-selector/time-selector.component";

@Component({
    selector: 'vrs-map-filters',
    templateUrl: './filter-menu.component.html',
    styleUrls: ['./filter-menu.component.scss']
})
export class FilterMenuComponent {
    @Input() municipalities: any[];
    @Input() isLoggedIn = false;

    @Output() fiListChange = new EventEmitter();
    @Output() euListChange = new EventEmitter();
    @Output() plantPestChange = new EventEmitter();
    @Output() timeChange = new EventEmitter();
    @Output() ownModeChange = new EventEmitter();
    @Output() municipalityChange = new EventEmitter();
    @Output() taxonChange = new EventEmitter();

    @ViewChild(TaxonSearchComponent) taxonSearch: TaxonSearchComponent;
    @ViewChild(TimeSelectorComponent) timeSelector : TimeSelectorComponent;

    updateMunicipality(val) {
        // TODO
    }
    updateTaxon(val) {
        this.taxonSearch.fillValue(val, false);
    }
    updateTime(val) {
        this.timeSelector.setTimeValue(val);
    }
    updateOwnMode(val) {
        const checkbox = <HTMLInputElement> document.getElementById('ownCheck');
        if (checkbox) checkbox.checked = val;
    }
    updateFiList(val) {
        const checkbox = <HTMLInputElement> document.getElementById('finnishList');
        if (checkbox) checkbox.checked = val;
    }
    updateEuList(val) {
        const checkbox = <HTMLInputElement> document.getElementById('euList');
        if (checkbox) checkbox.checked = val;
    }
    updatePlantPest(val) {
        const checkbox = <HTMLInputElement> document.getElementById('plantPest');
        if (checkbox) checkbox.checked = val;
    }

    onSelectMunicipality(event) {
        this.municipalityChange.emit(event.target.value);
    }
    onTaxonChange(event) {
        this.taxonChange.emit(event);
    }
    onTimeChange(event) {
        this.timeChange.emit(event);
    }
    onOwnModeChange(event) {
        this.ownModeChange.emit(event.target.checked);
    }
    onFiListCheckbox(event) {
        this.fiListChange.emit(event.target.checked);
    }
    onEuListCheckbox(event) {
        this.euListChange.emit(event.target.checked);
    }
    onPlantPestCheckbox(event) {
        this.plantPestChange.emit(event.target.checked);
    }
}