import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "capitalize"
})
export class CapitalizePipe implements PipeTransform {
    constructor() {}
    transform(value: string): string {
        return value.charAt(0).toUpperCase() + value.substring(1, value.length);
    }
}