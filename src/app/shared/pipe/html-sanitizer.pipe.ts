import { Pipe, PipeTransform, Sanitizer } from "@angular/core";
import { SafeHtml, DomSanitizer } from "@angular/platform-browser";

@Pipe({
    name: "bypasshtml"
})
export class HtmlSanitizerPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {}
    transform(value: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(value);
    }
}