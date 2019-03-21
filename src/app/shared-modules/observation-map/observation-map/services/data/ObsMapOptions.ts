import { EventEmitter } from "events";
import { Injectable } from "../../../../../../../node_modules/@angular/core";

export type ObsMapOption = "id" | "list" | "municipality" | "personToken"
                           | "taxonSearch" | 'fiList' | 'euList' | 'plantPest';

// TODO: typechecking for Options
type Options = {
    [i in ObsMapOption]?: any;
}

@Injectable()

export class ObsMapOptions {

    private options:Options;

    private _loadState:boolean = false;
    eventEmitter:EventEmitter = new EventEmitter();

    constructor() {
        this.options = {};
    }

    get loadState() {
        return this._loadState;
    }

    set loadState(b:boolean) {
        this._loadState = b;
        this.eventEmitter.emit('stateChange');
    }

    getOption(option:ObsMapOption){
        return this.options[option];
    }

    getOptions() {
        return this.options;
    }

    setOption(option:ObsMapOption, value:any) {
        this.options[option] = value;
        this.eventEmitter.emit('change');
    }

    setOptionSilent(option:ObsMapOption, value:any) {
        this.options[option] = value;
    }

    emitChange() {
        this.eventEmitter.emit('change');
    }

    setOptions(options:Array<[ObsMapOption, any]>) {
        options.forEach(option => {
            this.options[option[0]] = option[1];
        })
        this.eventEmitter.emit('change');
    }

}
