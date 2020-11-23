export enum StaticContent {
    Viekas, Root, FAQ, Contact
}

export function findContentID(target: StaticContent, lang: string) {
    let r: string = "";
    switch (target) {
        case StaticContent.Root:
            if (lang == "fi") r = "i-2";
            if (lang == "en") r = "i-16";
            if (lang == "sv") r = "i-14";
            break;
        case StaticContent.Viekas:
            if (lang == "fi") r = "i-393";
            if (lang == "en") r = "i-698";
            if (lang == "sv") r = "i-700";
            break;
        case StaticContent.FAQ:
            if (lang == "fi") r = "i-92";
            if (lang == "en") r = "i-151";
            if (lang == "sv") r = "i-159";
            break;
        case StaticContent.Contact:
            if (lang == "fi") r = "i-102";
            if (lang == "en") r = "i-525";
            if (lang == "sv") r = "i-2292";
            break;
    }
    return r;
}
