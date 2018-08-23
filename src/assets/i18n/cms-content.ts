export enum StaticContent {
    EUList, FIList, EuListObligations, FIListObligations, EradicationInfo, EradicationGuides, Root, Pets
}

export function findContentID(target: StaticContent, lang: string) {
    let r: string = "";
    switch (target) {
        case StaticContent.Root:
            if (lang == "fi") r = "i-2";
            if (lang == "en") r = "i-16";
            if (lang == "sv") r = "i-14";
            break;
        case StaticContent.EUList:
            if (lang == "fi") r = "i-113";
            if (lang == "en") r = "i-117";
            if (lang == "sv") r = "i-121";
            break;
        case StaticContent.FIList:
            if (lang == "fi") r = "i-115";
            if (lang == "en") r = "i-119";
            if (lang == "sv") r = "i-124";
            break;
        case StaticContent.EuListObligations:
            if (lang == "fi") r = "i-217";
            if (lang == "en") r = "i-221";
            if (lang == "sv") r = "i-225";
            break;
        case StaticContent.FIListObligations:
            if (lang == "fi") r = "i-219";
            if (lang == "en") r = "i-223";
            if (lang == "sv") r = "i-227";
            break;
        case StaticContent.EradicationInfo:
            if (lang == "fi") r = "i-237";
            if (lang == "en") r = "i-244";
            if (lang == "sv") r = "i-246";
            break;
        case StaticContent.EradicationGuides:
            if (lang == "fi") r = "i-239";
            if (lang == "en") r = "i-255";
            if (lang == "sv") r = "i-252";
            break;
        case StaticContent.Pets:
            if (lang == "fi") r = "i-229";
            if (lang == "en") r = "i-259";
            if (lang == "sv") r = "i-256";
            break;
    }
    return r;
}