import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "truncate"
})
export class TruncatePipe implements PipeTransform {
    constructor() {}
    transform(value: string, length: number): string {
        let truncated = value.slice(0, length);
        if (value.length > truncated.length) {
            truncated = truncated.concat('...');
        }
        return truncated;
    }
}
