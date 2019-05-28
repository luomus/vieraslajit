import { Component, Output, EventEmitter, Renderer2, ViewChild, ElementRef, Input, AfterViewInit, OnChanges, SimpleChanges } from "@angular/core";

@Component({
    selector: 'vrs-time-selector',
    template: `
<div class="time-selector">
    <input #startTime type='text' placeholder="YYYY-MM-DD" (blur)="onTimeChange($event)">
    –
    <input #endTime type='text' placeholder="YYYY-MM-DD" (blur)="onTimeChange($event)">
</div>
    `, styleUrls: ['./time-selector.component.scss']
})
export class TimeSelectorComponent {
    @Output() timeChangeEvent = new EventEmitter();

    @ViewChild('startTime') startTimeInput: ElementRef;
    @ViewChild('endTime') endTimeInput: ElementRef;

    constructor(private renderer: Renderer2) {

    }

    setTimeValue(input: string) {
        const split = input.split('/');
        this.startTimeInput.nativeElement.value = split[0] || '';
        split[1] !== '0' ? this.endTimeInput.nativeElement.value = split[1] : this.endTimeInput.nativeElement.value = '';
    }

    onTimeChange(event) {
        let endTimeValue = this.endTimeInput.nativeElement.value || 0;
        let output = this.startTimeInput.nativeElement.value + '/' + endTimeValue;
        this.timeChangeEvent.emit(output);
    }
}