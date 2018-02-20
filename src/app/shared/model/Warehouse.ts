export interface Warehouse{

}

export interface WarehouseQueryCount{
    accept?:string;
    format?:string;
    cache?:boolean;
    taxonID?:Array<string>;
    target?: Array<any>;
    includeNonValidTaxa?:boolean;
    informalTaxonGroupId?:Array<any>;
    redListStatusId?:Array<any>
    administrativeStatusId?:Array<any>;
    finnish?:boolean;
    invasive?:boolean;
    taxonRankId?:Array<any>;
    countryId?:Array<any>;
    finnishMunicipalityId?:Array<any>;
    biogeographicalProvinceId?:Array<any>;
    area?:Array<any>;
    time?:Array<any>;
    dayOfYear?:Array<any>;
    season?:Array<any>;
    keyword?:Array<any>;
    collectionId?:Array<any>;
    reliabilityOfCollection?:Array<any>
    sourceId?:Array<string>;
    recordBasis?:Array<string>;
    superRecordBasis?:Array<string>;
    lifeStage?:Array<string>;
    sex?:Array<string>;
    invasiveControl?:Array<string>;
    invasiveControlled?:Array<string>;
    documentID?:Array<any>;
    unitId?:Array<any>;
    individualId?:Array<any>;
    individualCountMin?:number;
    individualCountMax?:number;
    loadedLaterThan?:Date;
    loadedBefore?:Date;
    firstLoadedLaterThan?:Date;
    coordinates?: Array<any>;
    coordinateAccuracyMax?:number;
    ykj1km?:Array<any>;
    ykj10km?:Array<any>;
    ykj50km?:Array<any>;
    ykj100km?:Array<any>;
    ykj1kmCenter?:Array<any>;
    ykj10kmCenter?:Array<any>;
    ykj50kmCenter?:Array<any>;
    ykj100kmCenter?:Array<any>;
    typeSpecimen?:boolean;
    nativeOccurrence?:boolean;
    hasDocumentMedia?:boolean;
    hasGatheringMedia?:boolean;
    hasUnitMedia?:boolean;
    hasMedia?:boolean;
    editorId?:Array<any>;
    editorOrObserverId?:Array<any>;
    observerId?:Array<any>;
    secureReason:Array<string>;
    secureLevel:Array<string>;
    secured:boolean;
    annotated:boolean;
    annotationType:Array<any>;
    annotatedBefore:Date;
    includeSystemAnnotations:boolean;
    annotatedLaterThan:Date;
    qualityIssues:undefined;
    reliable:boolean;
    taxonReliability:Array<string>;
    unidentified:boolean;
    originalTaxonId:Array<any>;
    taxonCensus:Array<any>;
    originalTarget:Array<any>;
    firstLoadedBefore:Array<any>
    editorPersonToken:string;
    observerPersonToken:string;
    editorOrObserverPersonToken:string;


    
    
    


    


}