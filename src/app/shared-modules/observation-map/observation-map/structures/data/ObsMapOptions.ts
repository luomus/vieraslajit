import { EventEmitter } from "events";
import { Injectable } from "../../../../../../../node_modules/@angular/core";
import { ObservationMapModule } from "../../../observation-map.module";

export type ObsMapOption = "id" | "list" | "municipality" | "personToken" | "taxonSearch";

// TODO: typechecking for Options
type Options = {
    [i in ObsMapOption]?: any;
}

@Injectable()

export class ObsMapOptions {

    private options:Options;
    eventEmitter:EventEmitter = new EventEmitter();

    constructor() {
        this.options = {};
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

    setOptions(options:Array<[ObsMapOption, any]>) {
        options.forEach(option => {
            this.options[option[0]] = option[1];
        })
        this.eventEmitter.emit('change');
    }

}