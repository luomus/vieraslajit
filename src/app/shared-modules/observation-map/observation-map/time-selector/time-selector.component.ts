import { Component, Output, EventEmitter, Renderer2, ViewChild, ElementRef, Input, AfterViewInit, OnChanges, SimpleChanges } from "@angular/core";

@Component({
    selector: 'vrs-time-selector',
    template: `
    <div class="input-group mb-3">
        <input type="text"
            class="form-control"
            [ngModel]="dateRange"
            (ngModelChange)="onDateRangeChange($event)"
            placement="right"
            bsDaterangepicker>
        <div class="input-group-append">
            <button class="btn btn-outline-secondary remove" (click)="onRemove()" type="button">x</button>
        </div>
    </div>
    `, styleUrls: ['./time-selector.component.scss']
})
export class TimeSelectorComponent {
    @Output() timeChange = new EventEmitter<Date[]>();

    dateRange: Date[] = [];

    onDateRangeChange(event) {
        this.timeChange.emit(event);
    }

    setTimeValue(time: string) {
        this.dateRange = time.split('/').map(s => new Date(s));
    }

    onTimeChange(event) {
        this.timeChange.emit(event.value);
    }

    onRemove() {
        this.timeChange.emit(undefined);
        this.setTimeValue('');
    }
}