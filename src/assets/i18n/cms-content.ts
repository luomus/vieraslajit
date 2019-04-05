export enum StaticContent {
    Viekas, Root
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
            if (lang == "en") r = "i-393";
            if (lang == "sv") r = "i-393";
            break;
    }
    return r;
}