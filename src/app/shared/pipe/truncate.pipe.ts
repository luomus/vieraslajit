import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "truncate"
})
export class TruncatePipe implements PipeTransform {
    constructor() {}
    transform(value: string, length: number): string {
        return this.truncateHTML(value, length);
    }

    /**
     * 
     * @param html 
     * @param maxLength Maximum length of content (text inside tags). Tags, attributes etc. are unaffected.
     */
    truncateHTML(html: string, maxLength: number) {
        const trimmedHtml = html.replace(/(\r\n|\n|\r|\t)/gm, "");

        let outString = '';
        let contentLength = 0;

        let tagStack = [];
        let tagString = '';
        let writeTagString = false;
        let innerTagOpen = false;
        let closingTag = false;
        for (let i = 0; i < trimmedHtml.length; i++) {
            const char = trimmedHtml.charAt(i);
            switch(char) {
                case '<':
                    innerTagOpen = true;
                    tagString = '';
                    writeTagString = true;
                    closingTag = false;
                    break;
                case '>':
                    innerTagOpen = false;
                    writeTagString = false;
                    if (contentLength > maxLength) {
                        break;
                    }
                    if (closingTag) {
                        // previous tag was closed
                        tagStack.pop();
                    } else if (tagString !== 'br' && tagString !== 'hr') {
                        // an open tag was added
                        tagStack.push(tagString)
                    }
                    break;
                case '/':
                    closingTag = true;
                    break;
                case ' ':
                    writeTagString = false;
                    break;
                default:
                    if (writeTagString) {
                        tagString += char;
                    }
                    if (!innerTagOpen) {
                        contentLength++;
                    }
                    break;
            }
            if (contentLength <= maxLength) {
                outString += char;
            }
            if (contentLength === maxLength) {
                outString += '...';
                contentLength++;
            }
        }
        // close all leftover tags in the stack
        tagStack.reverse().forEach(tag => outString += `</${tag}>`);
        return outString;
    }
}
