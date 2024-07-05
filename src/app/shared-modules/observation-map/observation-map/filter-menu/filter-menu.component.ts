import { Component, EventEmitter, Output, Input, ViewChild, forwardRef, OnDestroy, OnInit } from "@angular/core";
import { TimeSelectorComponent } from "../time-selector/time-selector.component";
import { TaxonSearchComponent } from "app/shared-modules/taxon-search/taxon-search.component";
import { UserService } from "app/shared/service/user.service";
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Subscription } from "rxjs";

import * as moment from "moment";
import { TaxonService } from "app/shared/service/taxon.service";
import { TranslateService } from "@ngx-translate/core";

interface Filters {
    own: boolean,
    fiList: boolean,
    euList: boolean,
    plantPest: boolean,
    taxonId: string,
    municipality: string,
    time: string
}

const dateToQueryTimeInterval = (event: Date[] | undefined): string | undefined => {
    if (!event) {
      return "";
    }
    const startMoment = moment(event[0])
    const endMoment = moment(event[1])
    const start = startMoment.format("YYYY-MM-DD");
    const end = endMoment.format("YYYY-MM-DD");
    return start + '/' + end;
}

@Component({
    selector: 'vrs-map-filters',
    templateUrl: './filter-menu.component.html',
    styleUrls: ['./filter-menu.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FilterMenuComponent),
            multi: true
        }
    ]
})
export class FilterMenuComponent implements ControlValueAccessor, OnDestroy, OnInit {
    @Input() municipalities: any[];
    @Input() hidden = false;
    @Output() onClose = new EventEmitter();

    @ViewChild(TaxonSearchComponent) taxonSearch: TaxonSearchComponent;
    @ViewChild(TimeSelectorComponent) timeSelector: TimeSelectorComponent;

    form: FormGroup<Record<keyof Filters, FormControl>>;
    isLoggedIn = UserService.loggedIn();

    private onChange;
    private onTouched;
    private subscription = new Subscription();

    constructor(private fb: FormBuilder, private taxonService: TaxonService, private translate: TranslateService) {}

    ngOnInit(): void {
        this.form = this.fb.group({
            own: [false],
            fiList: [false],
            euList: [false],
            plantPest: [false],
            taxonId: [""],
            municipality: [""],
            time: [""]
        });

        this.subscription.add(
            this.form.valueChanges.subscribe(value => {
                this.onChange?.(value);
                this.onTouched?.();
            })
        );

    }

    writeValue(filters: Filters) {
        if (filters) {
            this.timeSelector?.setTimeValue(filters.time);
            this.form.setValue(filters);

            if (filters.taxonId) {
                this.subscription.add(
                    this.taxonService.getTaxon(filters.taxonId, this.translate.currentLang).subscribe(
                        res => this.taxonSearch?.fillValue(res.vernacularName)
                    )
                );
            }
        } else {
            this.form.reset();
        }
    }

    registerOnChange(fn: (value: Partial<Filters>) => void) {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void) {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean) {
        isDisabled ? this.form.disable() : this.form.enable();
    }

    onTaxonChange(event) {
        this.form.get("taxonId").setValue(event);
    }

    onTimeChange(event) {
        this.form.get("time").setValue(dateToQueryTimeInterval(event));
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}

