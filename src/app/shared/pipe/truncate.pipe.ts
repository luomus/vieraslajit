import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "truncate"
})
export class TruncatePipe implements PipeTransform {
    constructor() {}
    transform(value: string, length: number): string {
        return this.truncateHtml(value, length);
    }

    truncateHtml(html: string, length: number): string {
        let tagInnerOpen = false;
        let outputString = '';
        let count = 0;
        for (let i = 0; i < html.length; i++) {
            let char = html.charAt(i)
            if (char === '<') {
                tagInnerOpen = true;
                outputString += char;
            } else if (char === '>') {
                tagInnerOpen = false;
                outputString += char;
            } else if (tagInnerOpen === true) {
                outputString += char;
            } else {
                if (count < length) {
                    outputString += char;
                }
                if (count === length - 1) {
                    outputString += '...';
                }
                count++;
            }
        }
        return outputString;
    }
}
