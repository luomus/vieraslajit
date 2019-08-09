import { Component, Output, EventEmitter, Renderer2, ViewChild, ElementRef, Input, AfterViewInit, OnChanges, SimpleChanges } from "@angular/core";

@Component({
    selector: 'vrs-time-selector',
    template: `
    <input #timeInput [owlDateTime]="dt1" [owlDateTimeTrigger]="dt1" [selectMode]="'range'" (dateTimeChange)="onTimeChange($event)">
    <owl-date-time #dt1 [pickerType]="'calendar'" [firstDayOfWeek]="1"></owl-date-time>
    `, styleUrls: ['./time-selector.component.scss']
})
export class TimeSelectorComponent {
    @Output() timeChangeEvent = new EventEmitter();

    @ViewChild('timeInput') timeInput: ElementRef;

    constructor(private renderer: Renderer2) {}

    setTimeValue(time: string) {
        this.renderer.setAttribute(this.timeInput.nativeElement, 'placeholder', time);
    }

    onTimeChange(event) {
        this.timeChangeEvent.emit(event.value);
    }
}