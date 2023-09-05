import { Component, Output, EventEmitter, Renderer2, ViewChild, ElementRef, Input, AfterViewInit, OnChanges, SimpleChanges } from "@angular/core";

@Component({
    selector: 'vrs-time-selector',
    template: `
    <div class="input-group mb-3">
<!--         <input class="form-control" #timeInput [owlDateTime]="dt1" [owlDateTimeTrigger]="dt1" [selectMode]="'range'" (dateTimeChange)="onTimeChange($event)">
        <div class="input-group-append">
            <button class="btn btn-outline-secondary remove" (click)="onRemove()" type="button">x</button>
        </div> -->
    </div>
    
<!--     <owl-date-time #dt1 [pickerType]="'calendar'" [firstDayOfWeek]="1"></owl-date-time> -->
    `, styleUrls: ['./time-selector.component.scss']
})
export class TimeSelectorComponent {
    @Output() timeChangeEvent = new EventEmitter();

    @ViewChild('timeInput', { static: true }) timeInput: ElementRef;

    constructor(private renderer: Renderer2) {}

    setTimeValue(time: string) {
        this.renderer.setAttribute(this.timeInput.nativeElement, 'placeholder', time);
    }

    onTimeChange(event) {
        this.timeChangeEvent.emit(event.value);
    }

    onRemove() {
        this.timeChangeEvent.emit(undefined);
        this.timeInput.nativeElement.value = '';
        this.setTimeValue('');
    }
}