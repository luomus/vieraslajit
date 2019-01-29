import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "parsewp"
})
export class ParseWPPipe implements PipeTransform {
    constructor() {}
    transform(value: string): string {
        return parseWP(value);
    }
}

export function parseWP(data:string): string{
    // Replace captions with <figcaption>
    // with linked image
    const regexLink = /\[caption[^\]]*?align="([^"]*)"[^\]]*?\](<a.+?<\/a>)(.+?(?=\[\/caption\]))\[\/caption\]/mg;
    // just the image
    const regexImg = /\[caption[^\]]*?align="(.*?)"[^\]]*\](<img.+?(?=\/>)\/>)(.+?(?=\[\/caption\]))\[\/caption\]/mg;
    let output = data.replace(regexLink, '<figure class="$1">$2<figcaption>$3</figcaption></figure>');
    output = output.replace(regexImg, '<figure class="$1">$2<figcaption>$3</figcaption></figure>');
    return output
}